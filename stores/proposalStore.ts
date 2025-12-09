// stores/proposalStore.ts
import { auth } from '@/config/firebase';
import type { Proposal, VoteType } from '@/services/proposalService';
import {
    getProposalsByTrip,
    voteOnProposal,
} from '@/services/proposalService';
import { create } from 'zustand';

type ProposalStore = {
    proposals: Proposal[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProposals: (tripId: string) => Promise<void>;
    vote: (tripId: string, proposalId: string, vote: VoteType) => Promise<void>;
    clearProposals: () => void;
    setError: (error: string | null) => void;
};

export const useProposalStore = create<ProposalStore>((set, get) => ({
    proposals: [],
    isLoading: false,
    error: null,

    fetchProposals: async (tripId: string) => {
        console.log('🚀 Store: Buscando proposals...');
        set({ isLoading: true, error: null });
        try {
            const proposals = await getProposalsByTrip(tripId);
            console.log('✅ Store: Proposals carregadas:', proposals.length);
            set({ proposals, isLoading: false });
        } catch (error: any) {
            console.error('❌ Store: Erro ao carregar proposals:', error);
            set({
                error: error?.message ?? 'Erro ao carregar proposals',
                isLoading: false,
            });
        }
    },

    vote: async (tripId: string, proposalId: string, vote: VoteType) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            set({ error: 'Usuário não autenticado' });
            throw new Error('Usuário não autenticado');
        }

        console.log(`🗳️ Store: Votando ${vote} na proposal ${proposalId}`);

        // Atualização otimista do UI
        const { proposals } = get();
        const updatedProposals = proposals.map((p) => {
            if (p.id === proposalId) {
                const updatedVotes = p.votes.map((v) =>
                    v.userId === currentUser.uid
                        ? { ...v, vote, votedAt: new Date().toISOString() }
                        : v
                );

                // Se o usuário não tinha voto ainda, adiciona
                if (!p.votes.find((v) => v.userId === currentUser.uid)) {
                    updatedVotes.push({
                        userId: currentUser.uid,
                        vote,
                        votedAt: new Date().toISOString(),
                    });
                }

                return { ...p, votes: updatedVotes };
            }
            return p;
        });

        set({ proposals: updatedProposals });

        try {
            await voteOnProposal(tripId, proposalId, vote);

            // Recarrega as proposals para ter dados frescos do servidor
            await get().fetchProposals(tripId);

            console.log('✅ Store: Voto registrado');
        } catch (error: any) {
            console.error('❌ Store: Erro ao votar:', error);

            // Reverte a atualização otimista em caso de erro
            await get().fetchProposals(tripId);

            set({
                error: error?.message ?? 'Erro ao votar',
            });
            throw error;
        }
    },

    clearProposals: () => {
        set({
            proposals: [],
            error: null,
        });
    },

    setError: (error: string | null) => {
        set({ error });
    },
}));