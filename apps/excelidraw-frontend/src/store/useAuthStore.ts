import { create } from 'zustand';

interface AuthState {
  isUserLogin: boolean;
  setLogin: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isUserLogin: false,
  setLogin: (value) => set({ isUserLogin: value }),
}));
