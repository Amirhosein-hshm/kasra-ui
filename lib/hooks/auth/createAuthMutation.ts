import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { setTokens } from '../../axios/tokenStore';

// Helper to create auth mutations that set tokens on success
type MutationFn<TVariables, TData = void> = (
  variables: TVariables
) => Promise<TData>;

export function createAuthMutation<TVariables = void, TData = void>(
  mutationFn: MutationFn<TVariables, TData>,
  options?: UseMutationOptions<TData, Error, TVariables>
): UseMutationResult<TData, Error, TVariables> {
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, ...rest) => {
      // If the result is AuthTokensWithExpiry, set tokens
      if (data && (data as any).accessToken && (data as any).refreshToken) {
        setTokens(data as any);
      }
      options?.onSuccess?.(data, ...rest);
    },
    onError: (error, ...rest) => {
      // TODO: Show toast message
      console.error('Auth mutation failed', error);
      options?.onError?.(error, ...rest);
    },
    ...options,
  });
}
