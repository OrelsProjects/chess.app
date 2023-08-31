import { StateCreator } from "zustand";

export interface ILoginSlice {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (isLoggedIn: boolean, caller: string) => void;
}

export const createLoginSlice: StateCreator<ILoginSlice> = (set) => ({
  isLoggedIn: false,
  userId: null,
  setIsLoggedIn: (isLoggedIn: boolean, caller: string): void => {
    console.log("I am settings isLoggedIn to: ", isLoggedIn, "From: ", caller);
    set({ isLoggedIn });
  },
});
