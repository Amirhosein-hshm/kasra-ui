import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  refreshToken,
  AuthTokensWithExpiry,
} from '../../services/auth.service';
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
