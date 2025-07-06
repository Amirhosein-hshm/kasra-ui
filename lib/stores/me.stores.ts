import { create } from 'zustand';
import { UserMeInfoResponse } from '@/lib/types';

interface MeState {
  user: UserMeInfoResponse | null;
  initialized: boolean;
  setUser: (user: UserMeInfoResponse) => void;
  clearUser: () => void;
}

export const useMeStore = create<MeState>((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user, initialized: true }),
  clearUser: () => set({ user: null, initialized: false }),
}));
