// components/itinerary/TripProposalsTab.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { ItineraryFilters } from '@/components/itinerary/ItineraryFilters';
import { SuggestionCard } from '@/components/itinerary/SuggestionCard';
import {
    getVoteStats,
    type Proposal,
    type VoteType,
} from '@/services/proposalService';
import { useProposalStore } from '@/stores/proposalStore';

type FilterId = 'all' | 'activities' | 'dining' | 'lodging';

type Props = {
    tripId: string;
};

export function TripProposalsTab({ tripId }: Props) {
    const {
        proposals,
        isLoading,
        error,
        fetchProposals,
        vote: voteProposal,
    } = useProposalStore();

    const [activeFilter, setActiveFilter] = useState<FilterId>('all');
    const [isVotingId, setIsVotingId] = useState<string | null>(null);

    // Carrega as proposals da trip
    useEffect(() => {
        if (!tripId) return;

        console.log('📋 TripProposalsTab: carregando proposals da trip', tripId);
        fetchProposals(tripId).catch((err) => {
            console.error('❌ Erro ao carregar proposals na TripProposalsTab:', err);
        });
    }, [tripId, fetchProposals]);

    // Filtro por categoria
    const filteredProposals = useMemo(() => {
        if (!proposals || proposals.length === 0) return [];

        if (activeFilter === 'all') return proposals;

        return proposals.filter((p) => {
            const cat = (p.category || '').toLowerCase();

            if (activeFilter === 'activities') {
                return (
                    cat.includes('attraction') ||
                    cat.includes('activity') ||
                    cat.includes('adventure') ||
                    cat.includes('tour')
                );
            }

            if (activeFilter === 'dining') {
                return (
                    cat.includes('dinner') ||
                    cat.includes('lunch') ||
                    cat.includes('breakfast') ||
                    cat.includes('food') ||
                    cat.includes('restaurant')
                );
            }

            if (activeFilter === 'lodging') {
                return (
                    cat.includes('accommodation') ||
                    cat.includes('hotel') ||
                    cat.includes('stay')
                );
            }

            return true;
        });
    }, [proposals, activeFilter]);

    // Mapeia categoria -> ícone/cores da tag do card
    const getTagInfo = (proposal: Proposal) => {
        const cat = (proposal.category || '').toLowerCase();

        if (
            cat.includes('dinner') ||
            cat.includes('lunch') ||
            cat.includes('breakfast') ||
            cat.includes('food') ||
            cat.includes('restaurant')
        ) {
            return {
                icon: 'restaurant' as const,
                color: '#f97316',
                label: 'Dining',
            };
        }

        if (
            cat.includes('accommodation') ||
            cat.includes('hotel') ||
            cat.includes('stay')
        ) {
            return {
                icon: 'bed-outline' as const,
                color: '#3b82f6',
                label: 'Lodging',
            };
        }

        if (
            cat.includes('attraction') ||
            cat.includes('activity') ||
            cat.includes('adventure') ||
            cat.includes('tour')
        ) {
            return {
                icon: 'walk' as const,
                color: '#16a34a',
                label: 'Activity',
            };
        }

        return {
            icon: 'sparkles-outline' as const,
            color: '#6366f1',
            label: 'Suggestion',
        };
    };

    // Label da parte direita do chip (usa só priceRange do modelo real)
    const getTagRightLabel = (proposal: Proposal): string | undefined => {
        if (!proposal.priceRange) return undefined;
        return proposal.priceRange; // ex: '$$', '$$$'
    };

    // Constrói info de votação a partir do modelo real (votes[])
    const buildVoteInfo = (proposal: Proposal) => {
        const stats = getVoteStats(proposal.votes);
        const approveVotes = proposal.votes.filter(
            (v) => v.vote === 'approve'
        );

        const voteAvatars = approveVotes.slice(0, 3).map((v) => {
            // mock de avatar por usuário
            return `https://i.pravatar.cc/150?u=${v.userId}`;
        });

        const extraCount =
            approveVotes.length > 3 ? approveVotes.length - 3 : 0;

        const voteMoreLabel =
            extraCount > 0 ? `+${extraCount}` : undefined;

        // define se o card fica em "highlight" ou "muted"
        const voteStyle: 'highlight' | 'muted' =
            stats.approvePercentage >= 50 && stats.approve >= 2
                ? 'highlight'
                : 'muted';

        const voteLabelText =
            stats.total === 0
                ? 'No votes yet'
                : `${stats.approve} of ${stats.total} voted yes`;

        return {
            voteAvatars,
            voteMoreLabel,
            voteStyle,
            voteLabelText,
            progressPercent: stats.approvePercentage, // 0–100
            voteYes: stats.approve,
            voteTotal: stats.total,
        };
    };

    // Handler de voto (usa a action real do store: vote(tripId, proposalId, voteType))
    const handleVote = useCallback(
        async (proposalId: string, voteType: VoteType) => {
            if (!tripId) return;
            if (isVotingId) return;

            try {
                setIsVotingId(proposalId);
                console.log(
                    `🗳️ TripProposalsTab: votando ${voteType} na proposal ${proposalId}`
                );
                await voteProposal(tripId, proposalId, voteType);
            } catch (error) {
                console.error('❌ Erro ao votar na proposal:', error);
            } finally {
                setIsVotingId(null);
            }
        },
        [tripId, voteProposal, isVotingId]
    );

    return (
        <View style={styles.container}>
            {/* FILTERS */}
            <ItineraryFilters
                filters={[
                    {
                        id: 'all',
                        label: 'All Suggestions',
                        active: activeFilter === 'all',
                    },
                    {
                        id: 'activities',
                        label: 'Activities',
                        active: activeFilter === 'activities',
                    },
                    {
                        id: 'dining',
                        label: 'Dining',
                        active: activeFilter === 'dining',
                    },
                    {
                        id: 'lodging',
                        label: 'Lodging',
                        active: activeFilter === 'lodging',
                    },
                ]}
                onPressFilter={(id) => {
                    setActiveFilter(id as FilterId);
                }}
            />

            {/* LISTAGEM */}
            {isLoading && (!proposals || proposals.length === 0) ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF6B6B" />
                    <Text style={styles.loadingText}>
                        Loading suggestions...
                    </Text>
                </View>
            ) : error ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        Error loading suggestions
                    </Text>
                    <Text style={styles.emptySubtitle}>{error}</Text>
                </View>
            ) : filteredProposals.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No suggestions yet</Text>
                    <Text style={styles.emptySubtitle}>
                        Be the first to create a proposal for this trip.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.feed}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredProposals.map((proposal) => {
                        const tag = getTagInfo(proposal);
                        const tagRightLabel = getTagRightLabel(proposal);
                        const voteInfo = buildVoteInfo(proposal);

                        return (
                            <SuggestionCard
                                key={proposal.id}
                                imageUrl={
                                    proposal.imageUrl ??
                                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                                }
                                tagIcon={tag.icon}
                                tagIconColor={tag.color}
                                tagLabel={tag.label}
                                tagRightLabel={tagRightLabel!}
                                title={proposal.title}
                                description={proposal.description}
                                rating={undefined} // o modelo de Proposal não tem rating
                                voteYes={voteInfo.voteYes}
                                voteTotal={voteInfo.voteTotal}
                                voteAvatars={voteInfo.voteAvatars}
                                voteMoreLabel={voteInfo.voteMoreLabel}
                                voteStyle={voteInfo.voteStyle}
                                progressPercent={voteInfo.progressPercent}
                                primaryVariant="solid"
                                primaryLabel={
                                    isVotingId === proposal.id
                                        ? 'Voting...'
                                        : 'Vote Up'
                                }
                                secondaryLabel="Discuss"
                                onPrimaryPress={() =>
                                    handleVote(proposal.id, 'approve')
                                }
                                onSecondaryPress={() => {
                                    // futuro: abrir comentários / discussão da proposta
                                    console.log(
                                        '💬 Discuss proposal',
                                        proposal.id
                                    );
                                }}
                            />
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    feed: {
        flex: 1,
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 8,
        fontSize: 14,
        color: '#6b7280',
    },
    emptyContainer: {
        paddingVertical: 40,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
    },
    emptySubtitle: {
        marginTop: 6,
        fontSize: 13,
        color: '#6b7280',
        textAlign: 'center',
    },
});
