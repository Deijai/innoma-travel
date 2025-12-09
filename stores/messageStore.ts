// stores/messageStore.ts
import type { Message } from '@/services/messageService';
import {
    sendMessage,
    subscribeToMessages,
} from '@/services/messageService';
import type { Unsubscribe } from 'firebase/firestore';
import { create } from 'zustand';

type MessageStore = {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    unsubscribe: Unsubscribe | null;

    // Actions
    subscribeToChat: (tripId: string) => void;
    unsubscribeFromChat: () => void;
    send: (tripId: string, message: string) => Promise<void>;
    clearMessages: () => void;
    setError: (error: string | null) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
    messages: [],
    isLoading: false,
    error: null,
    unsubscribe: null,

    subscribeToChat: (tripId: string) => {
        console.log('🚀 Store: Inscrevendo no chat da trip:', tripId);

        // Cancela listener anterior se existir
        const currentUnsubscribe = get().unsubscribe;
        if (currentUnsubscribe) {
            currentUnsubscribe();
        }

        set({ isLoading: true, error: null });

        const unsubscribe = subscribeToMessages(
            tripId,
            (messages) => {
                console.log('✅ Store: Mensagens atualizadas:', messages.length);
                set({ messages, isLoading: false });
            }
        );

        set({ unsubscribe });
    },

    unsubscribeFromChat: () => {
        console.log('🔌 Store: Cancelando inscrição do chat');
        const currentUnsubscribe = get().unsubscribe;
        if (currentUnsubscribe) {
            currentUnsubscribe();
            set({ unsubscribe: null, messages: [] });
        }
    },

    send: async (tripId: string, message: string) => {
        if (!message.trim()) {
            return;
        }

        console.log('💬 Store: Enviando mensagem...');

        try {
            await sendMessage({
                tripId,
                message: message.trim(),
            });

            console.log('✅ Store: Mensagem enviada');

            // Não precisa atualizar o estado aqui
            // O listener em tempo real vai fazer isso automaticamente
        } catch (error: any) {
            console.error('❌ Store: Erro ao enviar mensagem:', error);
            set({
                error: error?.message ?? 'Erro ao enviar mensagem',
            });
            throw error;
        }
    },

    clearMessages: () => {
        const currentUnsubscribe = get().unsubscribe;
        if (currentUnsubscribe) {
            currentUnsubscribe();
        }
        set({
            messages: [],
            error: null,
            unsubscribe: null,
        });
    },

    setError: (error: string | null) => {
        set({ error });
    },
}));