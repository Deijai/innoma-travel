// components/trip/TripDetailFab.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    onPress?: () => void;
};

export function TripDetailFab({ onPress }: Props) {
    return (
        <TouchableOpacity
            style={styles.fab}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 8,
    },
});
