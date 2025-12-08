// src/components/auth/AuthInput.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

type AuthInputProps = {
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
} & TextInputProps;

export function AuthInput({ label, iconName, isPassword, ...textInputProps }: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const secure = isPassword ? !showPassword : textInputProps.secureTextEntry;

    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.inputWrapper}>
                <Ionicons
                    name={iconName}
                    size={20}
                    color="#94a3b8"
                    style={styles.inputIcon}
                />

                <TextInput
                    style={[styles.input, isPassword && styles.passwordInput]}
                    placeholderTextColor="#94a3b8"
                    {...textInputProps}
                    secureTextEntry={secure}
                />

                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword((prev) => !prev)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color="#94a3b8"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#64748b',
        letterSpacing: 1,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#0f172a',
    },
    passwordInput: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
});
