// src/components/trip/TripBottomBar.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TripBottomBarProps = {
    label: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
};

export function TripBottomBar({
    label,
    iconName = 'rocket-outline',
    onPress,
}: TripBottomBarProps) {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={styles.launchButton}
                activeOpacity={0.85}
                onPress={onPress}
            >
                <Text style={styles.launchButtonText}>{label}</Text>
                <Ionicons name={iconName} size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 8,
    },
    launchButton: {
        width: '100%',
        borderRadius: 18,
        backgroundColor: '#FF6B6B',
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 8,
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 8,
    },
    launchButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
});
