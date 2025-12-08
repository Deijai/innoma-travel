// src/components/trip/CoverUploadBox.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native';

type CoverUploadBoxProps = ViewProps & {
    onPress?: () => void;
};

export function CoverUploadBox({ onPress, style, ...rest }: CoverUploadBoxProps) {
    return (
        <View {...rest}>
            <Text style={styles.label}>Cover Photo</Text>
            <TouchableOpacity
                style={[styles.coverBox, style]}
                activeOpacity={0.9}
                onPress={onPress}
            >
                <View style={styles.coverInner}>
                    <View style={styles.coverIconCircle}>
                        <Ionicons
                            name="cloud-upload-outline"
                            size={22}
                            color="#FF6B6B"
                        />
                    </View>
                    <Text style={styles.coverTitle}>Tap to upload cover</Text>
                    <Text style={styles.coverSubtitle}>JPG or PNG up to 5MB</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        marginLeft: 4,
    },
    coverBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 24,
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coverInner: {
        alignItems: 'center',
    },
    coverIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,107,107,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    coverTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    coverSubtitle: {
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },
});
