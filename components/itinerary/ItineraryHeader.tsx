// src/components/itinerary/ItineraryHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ItineraryHeaderProps = {
    subtitle: string;
    title: string;
    onOptionsPress?: () => void;
    onNotificationsPress?: () => void;
};

export function ItineraryHeader({
    subtitle,
    title,
    onOptionsPress,
    onNotificationsPress,
}: ItineraryHeaderProps) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerSubtitle}>{subtitle}</Text>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            <View style={styles.headerActions}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onOptionsPress}
                    activeOpacity={0.8}
                >
                    <Ionicons name="options-outline" size={18} color="#4b5563" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bellWrapper}
                    onPress={onNotificationsPress}
                    activeOpacity={0.8}
                >
                    <Ionicons name="notifications-outline" size={18} color="#FF6B6B" />
                    <View style={styles.bellDot} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e7eb',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    headerSubtitle: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#FF6B6B',
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bellWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,107,107,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    bellDot: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6B6B',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
});
