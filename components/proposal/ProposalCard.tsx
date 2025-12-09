// components/proposal/ProposalCard.tsx
import type { Proposal, VoteType } from '@/services/proposalService';
import { getVoteStats } from '@/services/proposalService';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    proposal: Proposal;
    onVote: (proposalId: string, vote: VoteType) => void;
    getUserName: (userId: string) => string;
    getUserAvatar: (userId: string) => string;
};

export function ProposalCard({ proposal, onVote, getUserName, getUserAvatar }: Props) {
    const currentUser = useAuthStore((state) => state.user);

    const stats = useMemo(() => getVoteStats(proposal.votes), [proposal.votes]);

    const currentUserVote = useMemo(() => {
        if (!currentUser) return null;
        return proposal.votes.find((v) => v.userId === currentUser.id);
    }, [proposal.votes, currentUser]);

    const categoryColors: Record<string, { bg: string; text: string }> = {
        dinner: { bg: '#fed7aa', text: '#c05621' },
        lunch: { bg: '#fef3c7', text: '#b45309' },
        breakfast: { bg: '#fce7f3', text: '#be185d' },
        attraction: { bg: '#ddd6fe', text: '#6d28d9' },
        transport: { bg: '#bfdbfe', text: '#1e40af' },
        other: { bg: '#e5e7eb', text: '#374151' },
    };

    const categoryColor = categoryColors[proposal.category] || categoryColors.other;

    const creatorName = getUserName(proposal.createdBy);
    const creatorAvatar = getUserAvatar(proposal.createdBy);

    // Filtra votos aprovados para mostrar avatares
    const approvedVotes = proposal.votes.filter((v) => v.vote === 'approve');
    const pendingVotes = proposal.votes.filter((v) => v.vote === 'pending');

    // Formata tempo relativo
    const timeAgo = useMemo(() => {
        if (!proposal.createdAt) return '';

        const now = new Date();
        const created = new Date(proposal.createdAt);
        const diffMs = now.getTime() - created.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return 'Just now';
    }, [proposal.createdAt]);

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
                        <Text style={styles.cardHeaderName}>{creatorName}</Text> suggested a{' '}
                        {proposal.type}
                    </Text>
                    <Text style={styles.cardHeaderTime}>{timeAgo}</Text>
                </View>
                <View style={[styles.categoryTag, { backgroundColor: categoryColor.bg }]}>
                    <Text style={[styles.categoryTagText, { color: categoryColor.text }]}>
                        {proposal.category.toUpperCase()}
                    </Text>
                </View>
            </View>

            {/* Imagem */}
            {proposal.imageUrl && (
                <View style={styles.cardImageWrapper}>
                    <Image
                        source={{ uri: proposal.imageUrl }}
                        style={styles.cardImage}
                    />
                    {proposal.priceRange && (
                        <View style={styles.cardPriceBadge}>
                            <Text style={styles.cardPriceText}>{proposal.priceRange}</Text>
                        </View>
                    )}
                </View>
            )}

            {/* Conteúdo */}
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{proposal.title}</Text>
                <Text style={styles.cardDescription}>{proposal.description}</Text>

                {/* Status Badge */}
                {proposal.status !== 'voting' && (
                    <View style={styles.statusBadgeContainer}>
                        <View
                            style={[
                                styles.statusBadge,
                                proposal.status === 'approved'
                                    ? styles.statusBadgeApproved
                                    : styles.statusBadgeRejected,
                            ]}
                        >
                            <Ionicons
                                name={proposal.status === 'approved' ? 'checkmark-circle' : 'close-circle'}
                                size={14}
                                color={proposal.status === 'approved' ? '#16a34a' : '#dc2626'}
                            />
                            <Text
                                style={[
                                    styles.statusBadgeText,
                                    proposal.status === 'approved'
                                        ? styles.statusBadgeTextApproved
                                        : styles.statusBadgeTextRejected,
                                ]}
                            >
                                {proposal.status === 'approved' ? 'Approved' : 'Rejected'}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Footer - Votos */}
                <View style={styles.cardFooterRow}>
                    <View style={styles.voteStatusRow}>
                        {approvedVotes.slice(0, 3).map((vote, index) => (
                            <View key={vote.userId + index} style={styles.voteCircleApproved}>
                                <Ionicons name="checkmark" size={10} color="#16a34a" />
                            </View>
                        ))}
                        {pendingVotes.slice(0, 2).map((vote, index) => (
                            <View key={vote.userId + index} style={styles.voteCirclePending}>
                                <Text style={styles.voteCirclePendingText}>?</Text>
                            </View>
                        ))}
                        <Text style={styles.voteStatsText}>
                            {stats.approve}/{stats.total}
                        </Text>
                    </View>

                    {/* Botões de ação */}
                    {proposal.status === 'voting' && (
                        <View style={styles.cardActionsRow}>
                            <TouchableOpacity
                                style={[
                                    styles.actionReject,
                                    currentUserVote?.vote === 'reject' && styles.actionRejectActive,
                                ]}
                                onPress={() => onVote(proposal.id, 'reject')}
                            >
                                <Ionicons
                                    name="close"
                                    size={16}
                                    color={currentUserVote?.vote === 'reject' ? '#dc2626' : '#9ca3af'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.actionLike,
                                    currentUserVote?.vote === 'approve' && styles.actionLikeActive,
                                ]}
                                onPress={() => onVote(proposal.id, 'approve')}
                            >
                                <Ionicons name="heart" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
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
    categoryTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    categoryTagText: {
        fontSize: 10,
        fontWeight: '700',
    },
    cardImageWrapper: {
        height: 150,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardPriceBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    cardPriceText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#111827',
    },
    cardBody: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    cardDescription: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 4,
    },
    statusBadgeContainer: {
        marginTop: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        gap: 4,
    },
    statusBadgeApproved: {
        backgroundColor: '#dcfce7',
    },
    statusBadgeRejected: {
        backgroundColor: '#fee2e2',
    },
    statusBadgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    statusBadgeTextApproved: {
        color: '#16a34a',
    },
    statusBadgeTextRejected: {
        color: '#dc2626',
    },
    cardFooterRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    voteStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    voteCircleApproved: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#dcfce7',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -4,
    },
    voteCirclePending: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -4,
    },
    voteCirclePendingText: {
        fontSize: 11,
        color: '#9ca3af',
        fontWeight: '600',
    },
    voteStatsText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '600',
        marginLeft: 8,
    },
    cardActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionReject: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionRejectActive: {
        backgroundColor: '#fee2e2',
    },
    actionLike: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 4,
    },
    actionLikeActive: {
        backgroundColor: '#dc2626',
    },
});