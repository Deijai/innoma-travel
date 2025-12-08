// components/trip/StayFooterActions.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onReject?: () => void;
    onApprove?: () => void;
};

export function StayFooterActions({ onReject, onApprove }: Props) {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.footerButtonSecondary}
                activeOpacity={0.8}
                onPress={onReject}
            >
                <Text style={styles.footerSecondaryText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.footerButtonPrimary}
                activeOpacity={0.9}
                onPress={onApprove}
            >
                <Ionicons
                    name="checkmark"
                    size={16}
                    color="#fff"
                    style={{ marginRight: 6 }}
                />
                <Text style={styles.footerPrimaryText}>Approve</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        flexDirection: 'row',
        columnGap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 8,
    },
    footerButtonSecondary: {
        flex: 1,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#ffffff',
    },
    footerButtonPrimary: {
        flex: 1,
        borderRadius: 14,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'row',
    },
    footerSecondaryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
    },
    footerPrimaryText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
    },
});
