import { ThemeMode } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeState {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
    reset: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            themeMode: 'auto',

            setThemeMode: (mode) => set({ themeMode: mode }),

            toggleTheme: () => set((state) => ({
                themeMode: state.themeMode === 'light' ? 'dark' : 'light'
            })),

            reset: () => set({ themeMode: 'auto' }),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);