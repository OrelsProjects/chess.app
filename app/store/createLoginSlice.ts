import { StateCreator } from 'zustand';

export interface ILoginSlice {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const createLoginSlice: StateCreator<ILoginSlice> = set => ({
  isLoggedIn: false,
  userId: null,
  setIsLoggedIn: (isLoggedIn): void => {
    set({ isLoggedIn });
  },
});
