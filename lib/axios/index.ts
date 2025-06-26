import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import {
  getTokens,
  setTokens,
  clearTokens,
  onAuthChange,
  AuthTokens,
} from './tokenStore';

import { getAuthentication } from '@services';

import type { Token } from '../types/token';
import type { RefreshTokenRefreshTokenPostParams } from '../types/refreshTokenRefreshTokenPostParams';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<AuthTokens> | null = null;
let failedQueue: {
  resolve: (value?: AxiosResponse) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}[] = [];

function processQueue(error: any, token?: string) {
  failedQueue.forEach(async ({ resolve, reject, config }) => {
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers['Authorization'] = `Bearer ${token}`;
      resolve(await api(config));
    } else {
      reject(error);
    }
  });
  failedQueue = [];
}

// ✅ Attach token + snake_case conversion
api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens && config.headers) {
    config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
  }

  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }

  if (config.params) {
    config.params = snakecaseKeys(config.params, { deep: true });
  }

  return config;
});

// ✅ camelCase response + refresh token handling
api.interceptors.response.use(
  (response) => {
    if (response?.data && typeof response.data === 'object') {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        // TODO: Add your real refreshToken() logic here
        const tokens = getTokens();
        if (!tokens?.refreshToken) {
          refreshPromise = Promise.reject('No refresh token available');
        } else {
          refreshPromise = getAuthentication()
            .refreshTokenRefreshTokenPost({
              refreshToken: tokens.refreshToken,
            } as RefreshTokenRefreshTokenPostParams)
            .then((res) => {
              // The service returns an AxiosResponse<Token>
              const newTokens = res.data;
              setTokens(newTokens);
              return newTokens;
            });
        }

        try {
          const newTokens = await refreshPromise;
          processQueue(null, newTokens?.accessToken);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, undefined);
          clearTokens();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      } else if (refreshPromise) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }
    }

    return Promise.reject(error);
  }
);

export function setAccessToken(token: string) {
  const tokens = getTokens();
  if (tokens) {
    setTokens({ ...tokens, accessToken: token });
  }
}

export { clearTokens, onAuthChange };
export { api };
