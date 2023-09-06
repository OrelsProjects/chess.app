import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { createLoginSlice, ILoginSlice } from './createLoginSlice';
import { createThemeSlice, IThemeSlice } from './createThemeSlice';

interface IStore extends ILoginSlice, IThemeSlice {
  initializeAsync(): unknown;
}

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createLoginSlice(set, get, api),
      ...createThemeSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: (name: string) => AsyncStorage.getItem(name),
        setItem: (name: string, value: any) => AsyncStorage.setItem(name, JSON.stringify(value) ),
        removeItem: (name: string) => AsyncStorage.removeItem(name),
      },
    },
  ),
);
