import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import {
  getAuthTokens,
  setAuthTokens,
  clearAuthTokens,
} from '../utils/cookies';

import { getAuthentication } from '@/lib/services';

import type { RefreshTokenRefreshTokenPostParams } from '../types/refreshTokenRefreshTokenPostParams';

const baseURL = 'http://localhost:8000/';

const SNAKE_EXCLUDE = [/^RFP_field_id$/, /^RFP_id$/];

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
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
  const tokens = getAuthTokens();
  if (tokens && config.headers) {
    config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
  }

  if (
    config.data &&
    typeof config.data === 'object' &&
    !(config.data instanceof URLSearchParams) &&
    !(config.data instanceof FormData)
  ) {
    config.data = snakecaseKeys(config.data, {
      deep: true,
      exclude: SNAKE_EXCLUDE,
    });
  }

  if (config.params && typeof config.params === 'object') {
    config.params = snakecaseKeys(config.params, {
      deep: true,
      exclude: SNAKE_EXCLUDE,
    });
  }

  return config;
});

// ✅ camelCase response + refresh token handling
api.interceptors.response.use(
  (response) => {
    if (
      response?.data &&
      typeof response.data === 'object' &&
      response.data !== null
    ) {
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

        const tokens = getAuthTokens();

        if (!tokens?.refreshToken) {
          refreshPromise = Promise.reject('No refresh token available');
        } else {
          refreshPromise = getAuthentication()
            .refreshTokenRefreshTokenPost({
              refreshToken: tokens.refreshToken,
            } as RefreshTokenRefreshTokenPostParams)
            .then((res) => {
              const newTokens = res.data;
              setAuthTokens(newTokens);
              return newTokens;
            });
        }

        try {
          const newTokens = await refreshPromise;
          processQueue(null, newTokens?.accessToken);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, undefined);
          clearAuthTokens();
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
  const tokens = getAuthTokens();
  if (tokens) {
    setAuthTokens({ ...tokens, accessToken: token });
  }
}

export { clearAuthTokens };
export { api };
