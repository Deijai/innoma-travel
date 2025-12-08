// src/components/trip/TripInput.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;

type TripInputProps = TextInputProps & {
    label?: string;
    iconName: IconName;
    containerStyle?: ViewStyle;
};

export function TripInput({
    label,
    iconName,
    containerStyle,
    ...textInputProps
}: TripInputProps) {
    return (
        <View style={[styles.fieldBlock, containerStyle]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <View style={styles.inputWrapper}>
                <Ionicons
                    name={iconName}
                    size={18}
                    color="#9ca3af"
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#9ca3af"
                    {...textInputProps}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fieldBlock: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },
});
