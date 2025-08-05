import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getAuthentication } from '@/lib/services';
import { setAuthTokens, clearAuthTokens } from '../utils/cookies';
import {
  BodyLoginTokenPost,
  Token,
  RefreshTokenRefreshTokenPostParams,
  UserInfoResponse,
} from 'lib/types';
export function useLogin(
  options?: UseMutationOptions<Token, Error, BodyLoginTokenPost>
) {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await getAuthentication().loginTokenPost(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      setAuthTokens({
        userRoleId: data.roleId,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
    ...options,
  });
}

/**
 * Refresh Token Hook
 */
export function useRefreshToken(
  options?: UseMutationOptions<Token, Error, RefreshTokenRefreshTokenPostParams>
) {
  return useMutation({
    mutationFn: async (params) => {
      try {
        const res = await getAuthentication().refreshTokenRefreshTokenPost(
          params
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
    ...options,
  });
}

/**
 * Get Current User Info Hook
 */
export function useUserMe(options?: UseQueryOptions<UserInfoResponse, Error>) {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: async () => {
      try {
        const res = await getAuthentication().readUsersMeUsersMeGet();
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
}

export function logout() {
  clearAuthTokens();
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      clearAuthTokens();
      return true;
    },
  });
}
