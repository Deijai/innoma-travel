// src/components/trip/FriendListItem.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ImageStyle,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

type FriendListItemProps = {
    avatarUrl: string;
    name: string;
    username: string;
    online?: boolean;
    added?: boolean;
    muted?: boolean; // para a opacidade do terceiro item
    containerStyle?: ViewStyle;
    avatarStyle?: ImageStyle;
    onPress?: () => void;
};

export function FriendListItem({
    avatarUrl,
    name,
    username,
    online,
    added,
    muted,
    containerStyle,
    avatarStyle,
    onPress,
}: FriendListItemProps) {
    return (
        <View
            style={[
                styles.friendItem,
                muted && { opacity: 0.85 },
                containerStyle,
            ]}
        >
            <View style={styles.friendInfo}>
                <View style={styles.friendAvatarWrapper}>
                    <Image
                        source={{ uri: avatarUrl }}
                        style={[styles.friendAvatar, avatarStyle]}
                    />
                    {online && <View style={styles.friendOnlineDot} />}
                </View>
                <View>
                    <Text style={styles.friendName}>{name}</Text>
                    <Text style={styles.friendUsername}>{username}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={added ? styles.friendAddedButton : styles.friendAddButton}
                activeOpacity={0.8}
                onPress={onPress}
            >
                {added ? (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                    <Ionicons name="add" size={14} color="#6b7280" />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 8,
    },
    friendInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendAvatarWrapper: {
        marginRight: 10,
    },
    friendAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    friendOnlineDot: {
        position: 'absolute',
        right: -1,
        bottom: -1,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#22c55e',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    friendName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    friendUsername: {
        fontSize: 11,
        color: '#6b7280',
    },
    friendAddedButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 3,
    },
    friendAddButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
