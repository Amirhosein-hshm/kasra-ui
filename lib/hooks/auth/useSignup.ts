import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  signup,
  SignupPayload,
  AuthTokensWithExpiry,
} from '../../services/auth.service';
import { setTokens } from '../../axios/tokenStore';
// TODO: Import your toast system

export function useSignup(): UseMutationResult<
  AuthTokensWithExpiry,
  Error,
  SignupPayload
> {
  return useMutation<AuthTokensWithExpiry, Error, SignupPayload>({
    mutationFn: signup,
    onSuccess: (data) => {
      setTokens(data);
      // TODO: Redirect to dashboard or home
    },
    onError: (error) => {
      // TODO: Show toast message
      console.error('Signup failed', error);
    },
  });
}
