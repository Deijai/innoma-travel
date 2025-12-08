import { Colors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../stores/themeStore';

export function useTheme() {
    const systemColorScheme = useColorScheme();
    const { themeMode, setThemeMode, toggleTheme, reset } = useThemeStore();

    // Determina o tema atual baseado no modo
    const currentTheme: ColorScheme =
        themeMode === 'auto'
            ? (systemColorScheme || 'light')
            : themeMode;

    const colors = Colors[currentTheme];
    const isDark = currentTheme === 'dark';
    const isLight = currentTheme === 'light';

    return {
        theme: currentTheme,
        colors,
        themeMode,
        setThemeMode,
        toggleTheme,
        reset,
        isDark,
        isLight,
    };
}