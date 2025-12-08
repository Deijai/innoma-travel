// src/components/auth/SocialButton.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

type SocialButtonProps = {
    provider: 'google' | 'apple';
    label: string;
} & TouchableOpacityProps;

export function SocialButton({ provider, label, ...touchableProps }: SocialButtonProps) {
    if (provider === 'google') {
        return (
            <TouchableOpacity
                style={styles.googleButton}
                activeOpacity={0.8}
                {...touchableProps}
            >
                <Image
                    source={{ uri: 'https://www.svgrepo.com/show/475656/google-color.svg' }}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>{label}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.appleButton}
            activeOpacity={0.8}
            {...touchableProps}
        >
            <Ionicons name="logo-apple" size={18} color="#fff" />
            <Text style={styles.appleButtonText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    googleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    googleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    appleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        backgroundColor: '#0f172a',
        borderRadius: 12,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    appleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 8,
    },
});
