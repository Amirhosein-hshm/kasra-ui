import { create } from 'zustand';
import { UserInfoResponse } from '@/lib/types';

interface MeState {
  user: UserInfoResponse | null;
  setUser: (user: UserInfoResponse) => void;
  clearUser: () => void;
}

export const useMeStore = create<MeState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
