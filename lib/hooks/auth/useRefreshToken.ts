import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { setTokens } from '../../axios/tokenStore';
// TODO: Import your toast system

export function useRefreshToken(): UseMutationResult<
  AuthTokensWithExpiry,
  Error,
  void
> {
  return useMutation<AuthTokensWithExpiry, Error, void>({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      setTokens(data);
    },
    onError: (error) => {
      // TODO: Show toast message
      console.error('Refresh token failed', error);
    },
  });
}
