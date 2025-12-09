// services/pollService.ts
import { auth, db } from '@/config/firebase';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';

export type PollStatus = 'open' | 'closed';

export type PollOption = {
    id: string;
    label: string;
    votes: string[]; // Array de userIds que votaram nesta opção
};

export type Poll = {
    id: string;
    tripId: string;
    question: string;
    options: PollOption[];
    status: PollStatus;
    createdBy: string;
    createdAt: string | null;
    updatedAt: string | null;
};

export type CreatePollInput = {
    tripId: string;
    question: string;
    options: string[]; // Array de labels
};

function timestampToISO(ts: any): string | null {
    if (!ts) return null;
    if (ts.toDate) return ts.toDate().toISOString();
    if (typeof ts === 'string') return ts;
    return null;
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

/**
 * Cria uma nova enquete
 */
export async function createPoll(input: CreatePollInput): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    if (input.options.length < 2) {
        throw new Error('A enquete precisa de pelo menos 2 opções.');
    }

    // Converte labels em PollOptions
    const pollOptions: PollOption[] = input.options.map((label) => ({
        id: generateId(),
        label: label.trim(),
        votes: [],
    }));

    const pollData = {
        tripId: input.tripId,
        question: input.question.trim(),
        options: pollOptions,
        status: 'open' as PollStatus,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
        collection(db, 'trips', input.tripId, 'polls'),
        pollData
    );

    console.log('✅ Poll criada:', docRef.id);

    return docRef.id;
}

/**
 * Lista todas as polls de uma trip
 */
export async function getPollsByTrip(tripId: string): Promise<Poll[]> {
    const q = query(
        collection(db, 'trips', tripId, 'polls'),
        orderBy('createdAt', 'desc')
    );

    const snap = await getDocs(q);

    const polls: Poll[] = [];

    snap.forEach((docSnap) => {
        const data = docSnap.data();

        polls.push({
            id: docSnap.id,
            tripId,
            question: data.question ?? '',
            options: data.options ?? [],
            status: data.status ?? 'open',
            createdBy: data.createdBy ?? '',
            createdAt: timestampToISO(data.createdAt),
            updatedAt: timestampToISO(data.updatedAt),
        });
    });

    console.log(`📊 ${polls.length} polls encontradas`);

    return polls;
}

/**
 * Vota em uma opção da enquete
 */
export async function voteOnPoll(
    tripId: string,
    pollId: string,
    optionId: string
): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const pollRef = doc(db, 'trips', tripId, 'polls', pollId);
    const pollSnap = await getDoc(pollRef);

    if (!pollSnap.exists()) {
        throw new Error('Enquete não encontrada.');
    }

    const pollData = pollSnap.data();
    const currentOptions: PollOption[] = pollData.options ?? [];

    // Remove voto anterior do usuário (se existir)
    const updatedOptions = currentOptions.map((opt) => {
        const filteredVotes = opt.votes.filter((userId) => userId !== user.uid);

        // Se esta é a opção escolhida, adiciona o voto
        if (opt.id === optionId) {
            return {
                ...opt,
                votes: [...filteredVotes, user.uid],
            };
        }

        return {
            ...opt,
            votes: filteredVotes,
        };
    });

    await updateDoc(pollRef, {
        options: updatedOptions,
        updatedAt: serverTimestamp(),
    });

    console.log(`✅ Voto registrado na opção: ${optionId}`);
}

/**
 * Fecha uma enquete
 */
export async function closePoll(tripId: string, pollId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const pollRef = doc(db, 'trips', tripId, 'polls', pollId);
    const pollSnap = await getDoc(pollRef);

    if (!pollSnap.exists()) {
        throw new Error('Enquete não encontrada.');
    }

    const pollData = pollSnap.data();

    // Verifica se o usuário é o criador
    if (pollData.createdBy !== user.uid) {
        throw new Error('Apenas o criador pode fechar a enquete.');
    }

    await updateDoc(pollRef, {
        status: 'closed',
        updatedAt: serverTimestamp(),
    });

    console.log(`✅ Poll fechada: ${pollId}`);
}

/**
 * Calcula estatísticas de uma enquete
 */
export function getPollStats(poll: Poll) {
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);

    const optionsWithStats = poll.options.map((opt) => {
        const voteCount = opt.votes.length;
        const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

        return {
            ...opt,
            voteCount,
            percentage,
        };
    });

    // Ordena por número de votos (maior primeiro)
    optionsWithStats.sort((a, b) => b.voteCount - a.voteCount);

    return {
        totalVotes,
        options: optionsWithStats,
        winningOption: optionsWithStats[0],
    };
}

/**
 * Verifica se o usuário atual já votou
 */
export function hasUserVoted(poll: Poll, userId: string): boolean {
    return poll.options.some((opt) => opt.votes.includes(userId));
}

/**
 * Pega a opção que o usuário votou
 */
export function getUserVotedOption(poll: Poll, userId: string): PollOption | null {
    return poll.options.find((opt) => opt.votes.includes(userId)) || null;
}