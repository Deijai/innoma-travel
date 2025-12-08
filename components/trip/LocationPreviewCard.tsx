// src/components/trip/LocationPreviewCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type LocationPreviewCardProps = {
    name: string;
    address: string;
    rating?: string;    // ex: "4.5 ★"
    meta?: string;      // ex: "Café • $$"
    onPressEdit?: () => void;
};

export function LocationPreviewCard({
    name,
    address,
    rating = '4.5 ★',
    meta = 'Café • $$',
    onPressEdit,
}: LocationPreviewCardProps) {
    return (
        <View style={styles.locationCard}>
            <View style={styles.locationMiniMap}>
                <View style={styles.mapBg} />
                <Ionicons
                    name="location-sharp"
                    size={26}
                    color="#FF6B6B"
                />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.locationName}>{name}</Text>
                <Text style={styles.locationAddress}>{address}</Text>
                <View style={styles.locationMetaRow}>
                    <View style={styles.ratingPill}>
                        <Text style={styles.ratingPillText}>{rating}</Text>
                    </View>
                    <Text style={styles.locationMetaText}>{meta}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={onPressEdit} activeOpacity={0.8}>
                <Text style={styles.locationEditText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    locationCard: {
        marginTop: 10,
        padding: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationMiniMap: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    mapBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#dbeafe',
        opacity: 0.6,
    },
    locationName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    locationAddress: {
        fontSize: 11,
        color: '#6b7280',
        marginTop: 2,
    },
    locationMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingPill: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: '#fef3c7',
        marginRight: 6,
    },
    ratingPillText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#92400e',
    },
    locationMetaText: {
        fontSize: 10,
        color: '#9ca3af',
    },
    locationEditText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FF6B6B',
        marginLeft: 6,
    },
});
