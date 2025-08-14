// src/lib/hooks/auth.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { getAuthentication } from '@/lib/services';
import { setAuthTokens, clearAuthTokens } from '../utils/cookies';

import type {
  BodyLoginTokenPost,
  NotificationResponse,
  RefreshTokenRefreshTokenPostParams,
  Token,
  UserInfoResponse,
} from 'lib/types';

/**
 * Centralized query keys to avoid typos
 */
export const authQueryKeys = {
  me: ['userMe'] as const,
  notifications: ['notifications', 'me'] as const,
};

/**
 * Login Hook
 */
export function useLogin(
  options?: UseMutationOptions<Token, Error, BodyLoginTokenPost>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await getAuthentication().loginTokenPost(data);
      return res.data;
    },
    onSuccess: (data, ...rest) => {
      setAuthTokens({
        userRoleId: data.roleId,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      // After login, refetch user info & notifications
      qc.invalidateQueries({ queryKey: authQueryKeys.me });
      qc.invalidateQueries({ queryKey: authQueryKeys.notifications });
      options?.onSuccess?.(data, ...rest);
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
      const res = await getAuthentication().refreshTokenRefreshTokenPost(
        params
      );
      return res.data;
    },
    onSuccess: (data, ...rest) => {
      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      options?.onSuccess?.(data, ...rest);
    },
    ...options,
  });
}

/**
 * Get Current User Info Hook
 */
export function useUserMe(options?: UseQueryOptions<UserInfoResponse, Error>) {
  return useQuery({
    queryKey: authQueryKeys.me,
    queryFn: async () => {
      const res = await getAuthentication().readUsersMeUsersMeGet();
      return res.data;
    },
    // You can tweak defaults here if desired:
    // staleTime: 60_000,
    // refetchOnWindowFocus: false,
    ...options,
  });
}

/**
 * Get Current User Notifications Hook
 */
export function useUserNotifications(
  options?: UseQueryOptions<NotificationResponse[], Error>
) {
  return useQuery({
    queryKey: authQueryKeys.notifications,
    queryFn: async () => {
      const res = await getAuthentication().readUsersMeNotifMeGet();
      return res.data;
    },
    // staleTime: 30_000,
    // refetchInterval: 60_000, // uncomment if you want polling
    ...options,
  });
}

/**
 * Logout helpers
 */
export function logout() {
  clearAuthTokens();
}

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      clearAuthTokens();
      // Optionally clear cached user-related data
      qc.removeQueries({ queryKey: authQueryKeys.me });
      qc.removeQueries({ queryKey: authQueryKeys.notifications });
      return true;
    },
  });
}
