import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { logout } from '../../services/auth.service';
import { clearTokens } from '../../axios/tokenStore';

export function useLogout(): UseMutationResult<void, Error, void> {
  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      clearTokens();
      // TODO: Redirect to login page
    },
    onError: (error) => {
      // TODO: Show toast message
      console.error('Logout failed', error);
    },
  });
}
