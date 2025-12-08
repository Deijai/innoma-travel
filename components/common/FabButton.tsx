// src/components/common/FabButton.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

type FabButtonProps = {
    iconName?: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export function FabButton({ iconName = 'add', onPress, style }: FabButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.fab, style]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Ionicons name={iconName} size={26} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 90,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
});
