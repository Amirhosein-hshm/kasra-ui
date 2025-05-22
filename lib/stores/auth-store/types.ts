import User from '@/lib/types/models/User';

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type AuthActions = {
  login: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export type AuthStore = AuthState & AuthActions;

// Initial state
export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
