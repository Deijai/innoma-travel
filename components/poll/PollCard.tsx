// components/poll/PollCard.tsx
import type { Poll } from '@/services/pollService';
import { getPollStats, getUserVotedOption, hasUserVoted } from '@/services/pollService';
import { useAuthStore } from '@/stores/authStore';
import React, { useMemo } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    poll: Poll;
    onVote: (pollId: string, optionId: string) => void;
    onClose?: (pollId: string) => void;
    getUserName: (userId: string) => string;
    getUserAvatar: (userId: string) => string;
};

export function PollCard({ poll, onVote, onClose, getUserName, getUserAvatar }: Props) {
    const currentUser = useAuthStore((state) => state.user);

    const stats = useMemo(() => getPollStats(poll), [poll]);

    const userHasVoted = useMemo(() => {
        if (!currentUser) return false;
        return hasUserVoted(poll, currentUser.id);
    }, [poll, currentUser]);

    const userVotedOption = useMemo(() => {
        if (!currentUser) return null;
        return getUserVotedOption(poll, currentUser.id);
    }, [poll, currentUser]);

    const creatorName = getUserName(poll.createdBy);
    const creatorAvatar = getUserAvatar(poll.createdBy);

    const isCreator = currentUser?.id === poll.createdBy;

    // Formata tempo relativo
    const timeAgo = useMemo(() => {
        if (!poll.createdAt) return '';

        const now = new Date();
        const created = new Date(poll.createdAt);
        const diffMs = now.getTime() - created.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return 'Just now';
    }, [poll.createdAt]);

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeaderRow}>
                <Image
                    source={{ uri: creatorAvatar }}
                    style={styles.cardAvatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.cardHeaderText}>
                        <Text style={styles.cardHeaderName}>{creatorName}</Text> created a poll
                    </Text>
                    <Text style={styles.cardHeaderTime}>{timeAgo}</Text>
                </View>
                {poll.status === 'closed' && (
                    <View style={styles.closedBadge}>
                        <Text style={styles.closedBadgeText}>CLOSED</Text>
                    </View>
                )}
            </View>

            {/* Pergunta */}
            <Text style={styles.pollTitle}>{poll.question}</Text>

            {/* Opções */}
            <View style={styles.pollOptions}>
                {stats.options.map((option) => {
                    const isUserChoice = userVotedOption?.id === option.id;
                    const isWinning = option.id === stats.winningOption.id && stats.totalVotes > 0;

                    // Pega os primeiros 3 avatares de quem votou nesta opção
                    const voterAvatars = option.votes.slice(0, 3).map((userId) => getUserAvatar(userId));

                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.pollOptionContainer}
                            onPress={() => poll.status === 'open' && onVote(poll.id, option.id)}
                            disabled={poll.status === 'closed'}
                            activeOpacity={poll.status === 'open' ? 0.7 : 1}
                        >
                            <View style={styles.pollRow}>
                                <Text style={[
                                    styles.pollOptionLabel,
                                    isUserChoice && styles.pollOptionLabelActive,
                                ]}>
                                    {option.label}
                                    {isUserChoice && ' ✓'}
                                </Text>
                                <Text style={[
                                    styles.pollOptionValue,
                                    isWinning && styles.pollOptionValueActive,
                                ]}>
                                    {option.percentage}%
                                </Text>
                            </View>

                            {/* Barra de progresso */}
                            <View style={styles.pollBarBackground}>
                                <View
                                    style={[
                                        isWinning ? styles.pollBarFillActive : styles.pollBarFillInactive,
                                        { width: `${option.percentage}%` },
                                    ]}
                                />
                            </View>

                            {/* Avatares de quem votou */}
                            {voterAvatars.length > 0 && (
                                <View style={styles.pollAvatarRow}>
                                    {voterAvatars.map((avatar, idx) => (
                                        <Image
                                            key={idx}
                                            source={{ uri: avatar }}
                                            style={styles.pollAvatar}
                                        />
                                    ))}
                                    {option.votes.length > 3 && (
                                        <View style={styles.pollAvatarMore}>
                                            <Text style={styles.pollAvatarMoreText}>
                                                +{option.votes.length - 3}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {stats.totalVotes} vote{stats.totalVotes !== 1 ? 's' : ''}
                </Text>
                {isCreator && poll.status === 'open' && onClose && (
                    <TouchableOpacity onPress={() => onClose(poll.id)}>
                        <Text style={styles.closeButton}>Close Poll</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        marginTop: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    cardAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    cardHeaderText: {
        fontSize: 13,
        color: '#111827',
    },
    cardHeaderName: {
        fontWeight: '700',
    },
    cardHeaderTime: {
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },
    closedBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#e5e7eb',
    },
    closedBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6b7280',
    },
    pollTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        paddingHorizontal: 14,
        marginTop: 6,
    },
    pollOptions: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    pollOptionContainer: {
        marginBottom: 12,
    },
    pollRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    pollOptionLabel: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    pollOptionLabelActive: {
        color: '#FF6B6B',
        fontWeight: '700',
    },
    pollOptionValue: {
        fontSize: 13,
        color: '#6b7280',
        fontWeight: '600',
    },
    pollOptionValueActive: {
        color: '#FF6B6B',
        fontWeight: '700',
    },
    pollBarBackground: {
        width: '100%',
        height: 10,
        borderRadius: 999,
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
    },
    pollBarFillActive: {
        height: '100%',
        backgroundColor: '#FF6B6B',
        borderRadius: 999,
    },
    pollBarFillInactive: {
        height: '100%',
        backgroundColor: '#d1d5db',
        borderRadius: 999,
    },
    pollAvatarRow: {
        flexDirection: 'row',
        marginTop: 4,
        marginLeft: 4,
    },
    pollAvatar: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: -4,
    },
    pollAvatarMore: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#6b7280',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
    },
    pollAvatarMoreText: {
        fontSize: 8,
        color: '#fff',
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
    },
    footerText: {
        fontSize: 12,
        color: '#6b7280',
    },
    closeButton: {
        fontSize: 13,
        color: '#FF6B6B',
        fontWeight: '600',
    },
});