// src/components/trip/TripHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TripHeaderProps = {
    title: string;
    onPressBack?: () => void;
    onPressMenu?: () => void;
};

export function TripHeader({ title, onPressBack, onPressMenu }: TripHeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerIcon}
                onPress={onPressBack}
                activeOpacity={0.8}
            >
                <Ionicons name="arrow-back" size={18} color="#4b5563" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{title}</Text>

            <TouchableOpacity
                style={styles.headerIcon}
                onPress={onPressMenu}
                activeOpacity={0.8}
            >
                <Ionicons name="ellipsis-vertical" size={18} color="#4b5563" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e7eb',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
});
