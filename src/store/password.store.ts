import { createStore } from 'zustand';

interface PasswordStore {
  password: string | null;
  setPassword: (password: string | null) => void;
}

export const PasswordStore = createStore<PasswordStore>((set) => ({
  password: null,
  setPassword(password) {
    set({ password });
  },
}));
