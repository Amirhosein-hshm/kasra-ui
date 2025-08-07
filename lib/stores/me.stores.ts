import { create } from 'zustand';
import { UserMeInfoResponse } from '@/lib/types';

interface MeState {
  user: UserMeInfoResponse | null;
  initialized: boolean;
  setUser: (user: UserMeInfoResponse) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
  loading: boolean;
}

export const useMeStore = create<MeState>((set) => ({
  user: null,
  initialized: false,
  loading: false,
  setLoading: (loading) => set({ loading: loading }),
  setUser: (user) => set({ user, initialized: true }),
  clearUser: () => set({ user: null, initialized: false }),
}));
