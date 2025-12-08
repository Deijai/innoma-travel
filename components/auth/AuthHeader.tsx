// src/components/auth/AuthHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AuthHeaderProps = {
    appName: string;
    tagline: string;
    iconName?: keyof typeof Ionicons.glyphMap; // 👈 novo (opcional)
};

export function AuthHeader({ appName, tagline, iconName = 'map' }: AuthHeaderProps) {
    return (
        <View style={styles.topSection}>
            <View style={styles.logoContainer}>
                <Ionicons name={iconName} size={32} color="#fff" />
            </View>
            <Text style={styles.appName}>{appName}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    topSection: {
        alignItems: 'center',
        marginTop: 24,
    },
    logoContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#FF6B6B',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        transform: [{ rotate: '3deg' }],
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
        textAlign: 'center',
    },
});
