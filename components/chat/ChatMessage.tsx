// components/chat/ChatMessage.tsx
import type { Message } from '@/services/messageService';
import { useAuthStore } from '@/stores/authStore';
import React, { useMemo } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Props = {
    message: Message;
    getUserName: (userId: string) => string;
    getUserAvatar: (userId: string) => string;
};

export function ChatMessage({ message, getUserName, getUserAvatar }: Props) {
    const currentUser = useAuthStore((state) => state.user);

    const isOwnMessage = currentUser?.id === message.userId;
    const isSystemMessage = message.type === 'system';

    const userName = isSystemMessage ? 'WanderWe Bot' : getUserName(message.userId);
    const userAvatar = isSystemMessage
        ? 'https://ui-avatars.com/api/?name=Bot&background=7c3aed&color=fff'
        : getUserAvatar(message.userId);

    // Formata tempo relativo
    const timeAgo = useMemo(() => {
        if (!message.createdAt) return '';

        const now = new Date();
        const created = new Date(message.createdAt);
        const diffMs = now.getTime() - created.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays}d ago`;
        if (diffHours > 0) return `${diffHours}h ago`;
        if (diffMinutes > 0) return `${diffMinutes}m ago`;
        return 'Just now';
    }, [message.createdAt]);

    if (isSystemMessage) {
        return (
            <View style={styles.systemMessageContainer}>
                <View style={styles.systemMessage}>
                    <Text style={styles.systemMessageText}>{message.message}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={[
            styles.messageContainer,
            isOwnMessage && styles.ownMessageContainer,
        ]}>
            {!isOwnMessage && (
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
            )}

            <View style={[
                styles.messageBubble,
                isOwnMessage && styles.ownMessageBubble,
            ]}>
                {!isOwnMessage && (
                    <Text style={styles.userName}>{userName}</Text>
                )}
                <Text style={[
                    styles.messageText,
                    isOwnMessage && styles.ownMessageText,
                ]}>
                    {message.message}
                </Text>
                <Text style={[
                    styles.timeText,
                    isOwnMessage && styles.ownTimeText,
                ]}>
                    {timeAgo}
                </Text>
            </View>

            {isOwnMessage && (
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    ownMessageContainer: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginHorizontal: 8,
    },
    messageBubble: {
        maxWidth: '70%',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    ownMessageBubble: {
        backgroundColor: '#FF6B6B',
    },
    userName: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6b7280',
        marginBottom: 2,
    },
    messageText: {
        fontSize: 14,
        color: '#111827',
        lineHeight: 20,
    },
    ownMessageText: {
        color: '#fff',
    },
    timeText: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    ownTimeText: {
        color: 'rgba(255,255,255,0.7)',
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginVertical: 12,
        paddingHorizontal: 16,
    },
    systemMessage: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        maxWidth: '80%',
    },
    systemMessageText: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
    },
});