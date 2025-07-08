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
    mutationFn: (data) =>
      getAuthentication()
        .loginTokenPost(data)
        .then((res) => res.data),
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

export function useRefreshToken(
  options?: UseMutationOptions<Token, Error, RefreshTokenRefreshTokenPostParams>
) {
  return useMutation({
    mutationFn: (params) =>
      getAuthentication()
        .refreshTokenRefreshTokenPost(params)
        .then((res) => res.data),
    onSuccess: (data) => {
      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
    ...options,
  });
}

export function useUserMe(options?: UseQueryOptions<UserInfoResponse, Error>) {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: () =>
      getAuthentication()
        .readUsersMeUsersMeGet()
        .then((res) => res.data),
    ...options,
  });
}

export function logout() {
  clearAuthTokens();
}

export function useLogout() {
  const logoutMutation = useMutation({
    mutationFn: async () => {
      clearAuthTokens();
      return true;
    },
  });

  return logoutMutation;
}
