import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function ThemeToggleButton() {
    const { isDark, toggleTheme, colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                toggleStyles.toggleButton,
                { backgroundColor: colors.surface, borderColor: colors.border }
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <Text style={toggleStyles.toggleIcon}>{isDark ? '🌙' : '☀️'}</Text>
        </TouchableOpacity>
    );
}

const toggleStyles = StyleSheet.create({
    toggleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    toggleIcon: {
        fontSize: 24,
    },
});