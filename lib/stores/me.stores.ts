import { create } from 'zustand';
import { UserInfoResponse } from '@/lib/types';

interface MeState {
  user: UserInfoResponse | null;
  initialized: boolean;
  setUser: (user: UserInfoResponse) => void;
  clearUser: () => void;
}

export const useMeStore = create<MeState>((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user, initialized: true }),
  clearUser: () => set({ user: null, initialized: false }),
}));
