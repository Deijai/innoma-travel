// stores/pollStore.ts
import { auth } from '@/config/firebase';
import type { Poll } from '@/services/pollService';
import {
    closePoll,
    getPollsByTrip,
    voteOnPoll,
} from '@/services/pollService';
import { create } from 'zustand';

type PollStore = {
    polls: Poll[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchPolls: (tripId: string) => Promise<void>;
    vote: (tripId: string, pollId: string, optionId: string) => Promise<void>;
    close: (tripId: string, pollId: string) => Promise<void>;
    clearPolls: () => void;
    setError: (error: string | null) => void;
};

export const usePollStore = create<PollStore>((set, get) => ({
    polls: [],
    isLoading: false,
    error: null,

    fetchPolls: async (tripId: string) => {
        console.log('🚀 Store: Buscando polls...');
        set({ isLoading: true, error: null });
        try {
            const polls = await getPollsByTrip(tripId);
            console.log('✅ Store: Polls carregadas:', polls.length);
            set({ polls, isLoading: false });
        } catch (error: any) {
            console.error('❌ Store: Erro ao carregar polls:', error);
            set({
                error: error?.message ?? 'Erro ao carregar polls',
                isLoading: false,
            });
        }
    },

    vote: async (tripId: string, pollId: string, optionId: string) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            set({ error: 'Usuário não autenticado' });
            throw new Error('Usuário não autenticado');
        }

        console.log(`🗳️ Store: Votando na opção ${optionId} da poll ${pollId}`);

        // Atualização otimista do UI
        const { polls } = get();
        const updatedPolls = polls.map((p) => {
            if (p.id === pollId) {
                const updatedOptions = p.options.map((opt) => {
                    // Remove voto anterior do usuário
                    const filteredVotes = opt.votes.filter((uid) => uid !== currentUser.uid);

                    // Se esta é a opção escolhida, adiciona o voto
                    if (opt.id === optionId) {
                        return {
                            ...opt,
                            votes: [...filteredVotes, currentUser.uid],
                        };
                    }

                    return {
                        ...opt,
                        votes: filteredVotes,
                    };
                });

                return { ...p, options: updatedOptions };
            }
            return p;
        });

        set({ polls: updatedPolls });

        try {
            await voteOnPoll(tripId, pollId, optionId);

            // Recarrega as polls para ter dados frescos
            await get().fetchPolls(tripId);

            console.log('✅ Store: Voto registrado');
        } catch (error: any) {
            console.error('❌ Store: Erro ao votar:', error);

            // Reverte a atualização otimista em caso de erro
            await get().fetchPolls(tripId);

            set({
                error: error?.message ?? 'Erro ao votar',
            });
            throw error;
        }
    },

    close: async (tripId: string, pollId: string) => {
        console.log(`🔒 Store: Fechando poll ${pollId}`);
        try {
            await closePoll(tripId, pollId);

            // Recarrega as polls
            await get().fetchPolls(tripId);

            console.log('✅ Store: Poll fechada');
        } catch (error: any) {
            console.error('❌ Store: Erro ao fechar poll:', error);
            set({
                error: error?.message ?? 'Erro ao fechar poll',
            });
            throw error;
        }
    },

    clearPolls: () => {
        set({
            polls: [],
            error: null,
        });
    },

    setError: (error: string | null) => {
        set({ error });
    },
}));