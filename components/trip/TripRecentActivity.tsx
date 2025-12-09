// components/trip/TripRecentActivity.tsx
import type { VoteType } from '@/services/proposalService';
import { usePollStore } from '@/stores/pollStore';
import { useProposalStore } from '@/stores/proposalStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PollCard } from '../poll/PollCard';
import { ProposalCard } from '../proposal/ProposalCard';

type Props = {
    tripId: string;
};

export function TripRecentActivity({ tripId }: Props) {
    const { proposals, isLoading: isLoadingProposals, fetchProposals, vote: voteProposal } = useProposalStore();
    const { polls, isLoading: isLoadingPolls, fetchPolls, vote: votePoll, close: closePoll } = usePollStore();

    // Carrega proposals e polls quando o componente monta
    useFocusEffect(
        useCallback(() => {
            console.log('📋 Carregando proposals e polls da trip:', tripId);
            fetchProposals(tripId);
            fetchPolls(tripId);
        }, [tripId, fetchProposals, fetchPolls])
    );

    // Mock de função para pegar nome/avatar do usuário
    // TODO: integrar com userService para buscar dados reais
    const getUserName = useCallback((userId: string) => {
        return 'Member';
    }, []);

    const getUserAvatar = useCallback((userId: string) => {
        return `https://i.pravatar.cc/150?u=${userId}`;
    }, []);

    const handleVoteProposal = useCallback(
        async (proposalId: string, voteType: VoteType) => {
            try {
                await voteProposal(tripId, proposalId, voteType);
            } catch (error) {
                console.error('Erro ao votar:', error);
            }
        },
        [tripId, voteProposal]
    );

    const handleVotePoll = useCallback(
        async (pollId: string, optionId: string) => {
            try {
                await votePoll(tripId, pollId, optionId);
            } catch (error) {
                console.error('Erro ao votar na poll:', error);
            }
        },
        [tripId, votePoll]
    );

    const handleClosePoll = useCallback(
        async (pollId: string) => {
            try {
                await closePoll(tripId, pollId);
            } catch (error) {
                console.error('Erro ao fechar poll:', error);
            }
        },
        [tripId, closePoll]
    );

    // Combina proposals e polls ordenados por data
    const activities = useMemo(() => {
        const all = [
            ...proposals.map((p) => ({ type: 'proposal' as const, data: p, date: p.createdAt })),
            ...polls.map((p: any) => ({ type: 'poll' as const, data: p, date: p.createdAt })),
        ];

        all.sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return all;
    }, [proposals, polls]);

    const isLoading = isLoadingProposals || isLoadingPolls;

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Loading activities...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header seção */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <TouchableOpacity>
                    <Text style={styles.sectionSeeAll}>View All</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de Activities */}
            {activities.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="folder-open-outline" size={48} color="#d1d5db" />
                    <Text style={styles.emptyText}>No activities yet</Text>
                    <Text style={styles.emptySubtext}>
                        Be the first to create a proposal or poll!
                    </Text>
                </View>
            ) : (
                activities.map((activity, index) => {
                    if (activity.type === 'proposal') {
                        return (
                            <ProposalCard
                                key={`proposal-${activity.data.id}`}
                                proposal={activity.data}
                                onVote={handleVoteProposal}
                                getUserName={getUserName}
                                getUserAvatar={getUserAvatar}
                            />
                        );
                    } else {
                        return (
                            <PollCard
                                key={`poll-${activity.data.id}`}
                                poll={activity.data}
                                onVote={handleVotePoll}
                                onClose={handleClosePoll}
                                getUserName={getUserName}
                                getUserAvatar={getUserAvatar}
                            />
                        );
                    }
                })
            )}

            {/* TODO: Chat Messages e Itinerary virão aqui */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    sectionHeader: {
        marginTop: 4,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    sectionSeeAll: {
        fontSize: 11,
        color: '#FF6B6B',
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#6b7280',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
        marginTop: 12,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#9ca3af',
        marginTop: 4,
    },
});