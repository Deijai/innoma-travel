import { ThemeMode } from '@/constants/colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export function ThemeSwitch() {
    const { themeMode, setThemeMode, colors } = useTheme();

    const modes: Array<{ value: ThemeMode; label: string; icon: string }> = [
        { value: 'light', label: 'Light', icon: '☀️' },
        { value: 'dark', label: 'Dark', icon: '🌙' },
        { value: 'auto', label: 'Auto', icon: '⚙️' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            {modes.map((mode) => (
                <TouchableOpacity
                    key={mode.value}
                    style={[
                        styles.option,
                        {
                            backgroundColor: themeMode === mode.value ? colors.primary : 'transparent',
                            borderColor: colors.border,
                        }
                    ]}
                    onPress={() => setThemeMode(mode.value)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.icon}>{mode.icon}</Text>
                    <Text
                        style={[
                            styles.label,
                            {
                                color: themeMode === mode.value ? '#fff' : colors.text
                            }
                        ]}
                    >
                        {mode.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 4,
        gap: 4,
    },
    option: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
        borderWidth: 1,
    },
    icon: {
        fontSize: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});