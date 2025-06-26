import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  login,
  LoginCredentials,
  AuthTokensWithExpiry,
} from '../../services/auth.service';
import { setTokens } from '../../axios/tokenStore';
// TODO: Import your toast system

export function useLogin(): UseMutationResult<
  AuthTokensWithExpiry,
  Error,
  LoginCredentials
> {
  return useMutation<AuthTokensWithExpiry, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      setTokens(data);
      // TODO: Redirect to dashboard or home
    },
    onError: (error) => {
      // TODO: Show toast message
      console.error('Login failed', error);
    },
  });
}
