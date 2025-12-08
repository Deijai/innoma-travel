// src/components/profile/ProfileTopCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProfileTopCardProps = {
    avatarUrl: string;
    name: string;
    location: string;
    onPressEditAvatar?: () => void;
};

export function ProfileTopCard({
    avatarUrl,
    name,
    location,
    onPressEditAvatar,
}: ProfileTopCardProps) {
    return (
        <View style={styles.profileTop}>
            <View style={styles.avatarWrapper}>
                <Image
                    source={{ uri: avatarUrl }}
                    style={styles.avatar}
                />
                <TouchableOpacity
                    style={styles.avatarEdit}
                    onPress={onPressEditAvatar}
                    activeOpacity={0.8}
                >
                    <Ionicons name="pencil" size={12} color="#ffffff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.locationRow}>
                <Ionicons
                    name="location-outline"
                    size={14}
                    color="#FF6B6B"
                />
                <Text style={styles.locationText}>{location}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileTop: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#ffffff',
        marginBottom: 6,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    avatarEdit: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FF6B6B',
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        fontSize: 13,
        color: '#6b7280',
        marginLeft: 4,
    },
});
