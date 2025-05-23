// lib/stores/authStore.ts
import { create } from 'zustand';
import { persist, PersistStorage, devtools } from 'zustand/middleware';
import { initialAuthState, type AuthStore } from './types';
import User from '@/lib/types/models/User';

const storage: PersistStorage<unknown> = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem(name) || 'null');
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialAuthState,
        login: async () => {
          set({ isLoading: true, error: null });
          try {
            const user: User = {
              id: 0,
              nationalCode: '1234567890',
              phone: '09000000000',
            };
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (err: unknown) {
            set({
              error: (err as { message: string }).message,
              isLoading: false,
            });
          }
        },
        logout: (callback?: () => void) => {
          set(initialAuthState);
          callback?.();
        },
        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage',
        storage, // Custom storage for Next.js
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }), // Only persist these fields
      }
    ),
    {
      name: 'auth-storage',
    }
  )
);
