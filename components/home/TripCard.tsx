// src/components/home/TripCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type TripParticipant = {
    avatarUrl: string;
};

type TripCardProps = {
    imageUrl: string;
    badgeIcon: keyof typeof Ionicons.glyphMap;
    badgeText: string;
    country: string;
    title: string;
    participants?: TripParticipant[];
    extraParticipantsLabel?: string; // ex: "+2"
    onPress?: () => void;
};

export function TripCard({
    imageUrl,
    badgeIcon,
    badgeText,
    country,
    title,
    participants = [],
    extraParticipantsLabel,
    onPress,
}: TripCardProps) {
    return (
        <View style={styles.tripCard}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.tripImage}
            />
            <View style={styles.tripOverlay} />

            {/* Badge */}
            <View style={styles.badge}>
                <Ionicons
                    name={badgeIcon}
                    size={12}
                    color="#fff"
                    style={{ marginRight: 4 }}
                />
                <Text style={styles.badgeText}>{badgeText}</Text>
            </View>

            {/* Content */}
            <View style={styles.tripContent}>
                <View style={styles.locationRow}>
                    <Ionicons
                        name="location-sharp"
                        size={14}
                        color="#FF6B6B"
                    />
                    <Text style={styles.locationText}>{country.toUpperCase()}</Text>
                </View>

                <Text style={styles.tripTitle}>{title}</Text>

                <View style={styles.tripFooter}>
                    <View style={styles.avatarsRow}>
                        {participants.map((p, index) => (
                            <Image
                                key={`${p.avatarUrl}-${index}`}
                                source={{ uri: p.avatarUrl }}
                                style={styles.smallAvatar}
                            />
                        ))}

                        {extraParticipantsLabel && (
                            <View style={styles.moreAvatar}>
                                <Text style={styles.moreAvatarText}>
                                    {extraParticipantsLabel}
                                </Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={onPress}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="arrow-forward"
                            size={18}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tripCard: {
        width: 280,
        height: 320,
        borderRadius: 24,
        overflow: 'hidden',
        marginRight: 16,
        backgroundColor: '#000',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 6,
    },
    tripImage: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
    },
    tripOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    badge: {
        position: 'absolute',
        top: 16,
        right: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
    },
    tripContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 20,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        marginLeft: 4,
        color: '#FF6B6B',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
    },
    tripTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    tripFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        marginRight: -8,
    },
    moreAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -2,
    },
    moreAvatarText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '600',
    },
    arrowButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
