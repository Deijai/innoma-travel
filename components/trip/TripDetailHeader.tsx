// components/trip/TripDetailHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    coverImageUrl: string;
    countdownLabel: string;
    tripTitle: string;
    tripDateLabel: string;
    avatars: string[];
    extraCount: number;
    onBack: () => void;
    onOpenSettings: () => void;
    // 👇 nova prop, opcional
    isLoadingMembers?: boolean;
};


export function TripDetailHeader({
    coverImageUrl,
    countdownLabel,
    tripTitle,
    tripDateLabel,
    avatars,
    extraCount,
    onBack,
    onOpenSettings,
}: Props) {
    return (
        <View style={styles.header}>
            <Image
                source={{ uri: coverImageUrl }}
                style={styles.headerImage}
            />
            <View style={styles.headerOverlay} />

            {/* Top nav (back + settings) */}
            <View style={styles.headerTopBar}>
                <TouchableOpacity
                    style={styles.headerIconButton}
                    activeOpacity={0.8}
                    onPress={onBack}
                >
                    <Ionicons name="chevron-back" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.headerIconButton}
                    activeOpacity={0.8}
                    onPress={onOpenSettings}
                >
                    <Ionicons name="settings-outline" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Trip info + avatars */}
            <View style={styles.headerBottomContent}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.badgeText}>{countdownLabel}</Text>
                    <Text style={styles.tripTitle}>{tripTitle}</Text>
                    <Text style={styles.tripDate}>
                        <Ionicons
                            name="calendar-outline"
                            size={14}
                            color="#e5e7eb"
                        />{' '}
                        {tripDateLabel}
                    </Text>
                </View>

                <View style={styles.avatarRow}>
                    {avatars.map((avatarUrl, index) => (
                        <Image
                            key={avatarUrl + index}
                            source={{ uri: avatarUrl }}
                            style={[
                                styles.headerAvatar,
                                index === 0 ? { marginLeft: 0 } : undefined,
                            ]}
                        />
                    ))}
                    {typeof extraCount === 'number' && extraCount > 0 && (
                        <View style={styles.headerAvatarMore}>
                            <Text style={styles.headerAvatarMoreText}>
                                +{extraCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 280,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    headerTopBar: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    headerIconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 5,
    },
    badgeText: {
        backgroundColor: '#FF6B6B',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    tripTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    tripDate: {
        fontSize: 13,
        color: 'rgba(249,250,251,0.8)',
        fontWeight: '500',
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
        marginLeft: -10,
    },
    headerAvatarMore: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10,
    },
    headerAvatarMoreText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
});
