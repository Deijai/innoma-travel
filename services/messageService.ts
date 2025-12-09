// services/messageService.ts
import { auth, db } from '@/config/firebase';
import {
    addDoc,
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    Unsubscribe,
} from 'firebase/firestore';

export type MessageType = 'text' | 'system';

export type Message = {
    id: string;
    tripId: string;
    userId: string;
    message: string;
    type: MessageType;
    createdAt: string | null;
};

export type SendMessageInput = {
    tripId: string;
    message: string;
    type?: MessageType;
};

function timestampToISO(ts: any): string | null {
    if (!ts) return null;
    if (ts.toDate) return ts.toDate().toISOString();
    if (typeof ts === 'string') return ts;
    return null;
}

/**
 * Envia uma mensagem no chat
 */
export async function sendMessage(input: SendMessageInput): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const messageData = {
        tripId: input.tripId,
        userId: user.uid,
        message: input.message.trim(),
        type: input.type ?? 'text',
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
        collection(db, 'trips', input.tripId, 'messages'),
        messageData
    );

    console.log('✅ Mensagem enviada:', docRef.id);

    return docRef.id;
}

/**
 * Cria uma mensagem de sistema (bot)
 */
export async function sendSystemMessage(
    tripId: string,
    message: string
): Promise<string> {
    const messageData = {
        tripId,
        userId: 'system',
        message: message.trim(),
        type: 'system' as MessageType,
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
        collection(db, 'trips', tripId, 'messages'),
        messageData
    );

    console.log('✅ Mensagem de sistema enviada:', docRef.id);

    return docRef.id;
}

/**
 * Listener em tempo real para mensagens
 * Retorna função para cancelar o listener
 */
export function subscribeToMessages(
    tripId: string,
    callback: (messages: Message[]) => void,
    limitCount: number = 50
): Unsubscribe {
    const q = query(
        collection(db, 'trips', tripId, 'messages'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages: Message[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
                id: doc.id,
                tripId,
                userId: data.userId ?? '',
                message: data.message ?? '',
                type: data.type ?? 'text',
                createdAt: timestampToISO(data.createdAt),
            });
        });

        // Inverte para mostrar mais antigas primeiro
        messages.reverse();

        console.log(`💬 ${messages.length} mensagens recebidas`);

        callback(messages);
    });

    return unsubscribe;
}