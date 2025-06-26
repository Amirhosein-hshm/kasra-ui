import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { clearTokens } from '../../axios/tokenStore';

export function useLogout(): UseMutationResult<void, Error, void> {
  return useMutation<void, Error, void>({
    mutationFn: clearTokens,
    onSuccess: () => {
      // TODO: Redirect to login page
    },
    onError: (error) => {
      // TODO: Show toast message
      console.error('Logout failed', error);
    },
  });
}
