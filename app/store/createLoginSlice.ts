import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator } from "zustand";

export interface ILoginSlice {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (isLoggedIn: boolean, caller: string) => void;
}

export const createLoginSlice: StateCreator<ILoginSlice> = (set) => ({
  isLoggedIn: false, // We'll initialize this shortly
  userId: null,
  setIsLoggedIn: async (isLoggedIn: boolean): Promise<void> => {
    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    set({ isLoggedIn });
  },
  initializeAsync: async () => {
    const isLoggedInStr = await AsyncStorage.getItem("isLoggedIn");
    const isLoggedIn = JSON.parse(isLoggedInStr ?? "false");
    set({ isLoggedIn });
  },
});
