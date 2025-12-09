// services/proposalService.ts
import { auth, db, storage } from '@/config/firebase';
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
import {
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

export type ProposalType = 'restaurant' | 'activity' | 'accommodation';
export type ProposalCategory = 'dinner' | 'lunch' | 'breakfast' | 'attraction' | 'transport' | 'other';
export type VoteType = 'approve' | 'reject' | 'pending';
export type ProposalStatus = 'voting' | 'approved' | 'rejected';

export type ProposalVote = {
    userId: string;
    vote: VoteType;
    votedAt: string;
};

export type Proposal = {
    id: string;
    tripId: string;
    type: ProposalType;
    category: ProposalCategory;
    title: string;
    description: string;
    imageUrl: string | null;
    priceRange: '$' | '$$' | '$$$' | '$$$$' | null;
    votes: ProposalVote[];
    status: ProposalStatus;
    createdBy: string;
    createdAt: string | null;
    updatedAt: string | null;
};

export type CreateProposalInput = {
    tripId: string;
    type: ProposalType;
    category: ProposalCategory;
    title: string;
    description: string;
    imageLocalUri?: string | null;
    priceRange?: '$' | '$$' | '$$$' | '$$$$' | null;
};

async function uploadProposalImageIfNeeded(
    tripId: string,
    localUri?: string | null
): Promise<string | null> {
    if (!localUri) return null;

    const user = auth.currentUser;
    const uid = user?.uid ?? 'anonymous';

    const response = await fetch(localUri);
    const blob = await response.blob();

    const fileRef = ref(
        storage,
        `proposals/${tripId}/${uid}/${Date.now()}-proposal.jpg`
    );

    await uploadBytes(fileRef, blob);

    const url = await getDownloadURL(fileRef);
    return url;
}

function timestampToISO(ts: any): string | null {
    if (!ts) return null;
    if (ts.toDate) return ts.toDate().toISOString();
    if (typeof ts === 'string') return ts;
    return null;
}

/**
 * Cria uma nova proposta
 */
export async function createProposal(input: CreateProposalInput): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const imageUrl = await uploadProposalImageIfNeeded(input.tripId, input.imageLocalUri);

    // Busca todos os membros da trip para inicializar os votos
    const tripRef = doc(db, 'trips', input.tripId);
    const tripSnap = await getDoc(tripRef);

    if (!tripSnap.exists()) {
        throw new Error('Trip não encontrada.');
    }

    const tripData = tripSnap.data();
    const memberIds: string[] = tripData.memberIds ?? [];

    // Inicializa votos: todos como 'pending' exceto o criador que já aprova
    const initialVotes: ProposalVote[] = memberIds.map((memberId) => ({
        userId: memberId,
        vote: (memberId === user.uid ? 'approve' : 'pending') as VoteType,
        votedAt: memberId === user.uid ? new Date().toISOString() : '',
    }));

    const proposalData = {
        tripId: input.tripId,
        type: input.type,
        category: input.category,
        title: input.title.trim(),
        description: input.description.trim(),
        imageUrl: imageUrl ?? null,
        priceRange: input.priceRange ?? null,
        votes: initialVotes,
        status: 'voting' as ProposalStatus,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
        collection(db, 'trips', input.tripId, 'proposals'),
        proposalData
    );

    console.log('✅ Proposal criada:', docRef.id);

    return docRef.id;
}

/**
 * Lista todas as proposals de uma trip
 */
export async function getProposalsByTrip(tripId: string): Promise<Proposal[]> {
    const q = query(
        collection(db, 'trips', tripId, 'proposals'),
        orderBy('createdAt', 'desc')
    );

    const snap = await getDocs(q);

    const proposals: Proposal[] = [];

    snap.forEach((docSnap) => {
        const data = docSnap.data();

        proposals.push({
            id: docSnap.id,
            tripId,
            type: data.type ?? 'activity',
            category: data.category ?? 'other',
            title: data.title ?? '',
            description: data.description ?? '',
            imageUrl: data.imageUrl ?? null,
            priceRange: data.priceRange ?? null,
            votes: data.votes ?? [],
            status: data.status ?? 'voting',
            createdBy: data.createdBy ?? '',
            createdAt: timestampToISO(data.createdAt),
            updatedAt: timestampToISO(data.updatedAt),
        });
    });

    console.log(`📦 ${proposals.length} proposals encontradas`);

    return proposals;
}

/**
 * Vota em uma proposta
 */
export async function voteOnProposal(
    tripId: string,
    proposalId: string,
    vote: VoteType
): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const proposalRef = doc(db, 'trips', tripId, 'proposals', proposalId);
    const proposalSnap = await getDoc(proposalRef);

    if (!proposalSnap.exists()) {
        throw new Error('Proposta não encontrada.');
    }

    const proposalData = proposalSnap.data();
    const currentVotes: ProposalVote[] = proposalData.votes ?? [];

    // Atualiza ou adiciona o voto do usuário
    const updatedVotes = currentVotes.map((v) =>
        v.userId === user.uid
            ? { ...v, vote, votedAt: new Date().toISOString() }
            : v
    );

    // Se o usuário não estava na lista, adiciona
    if (!currentVotes.find((v) => v.userId === user.uid)) {
        updatedVotes.push({
            userId: user.uid,
            vote,
            votedAt: new Date().toISOString(),
        });
    }

    // Calcula novo status baseado nos votos
    const totalVotes = updatedVotes.length;
    const approveCount = updatedVotes.filter((v) => v.vote === 'approve').length;
    const rejectCount = updatedVotes.filter((v) => v.vote === 'reject').length;
    const pendingCount = updatedVotes.filter((v) => v.vote === 'pending').length;

    let newStatus: ProposalStatus = 'voting';

    // Se todos votaram
    if (pendingCount === 0) {
        // Maioria simples
        if (approveCount > rejectCount) {
            newStatus = 'approved';
        } else if (rejectCount > approveCount) {
            newStatus = 'rejected';
        }
    }

    await updateDoc(proposalRef, {
        votes: updatedVotes,
        status: newStatus,
        updatedAt: serverTimestamp(),
    });

    console.log(`✅ Voto registrado: ${vote} | Novo status: ${newStatus}`);
}

/**
 * Calcula estatísticas de votação
 */
export function getVoteStats(votes: ProposalVote[]) {
    const total = votes.length;
    const approve = votes.filter((v) => v.vote === 'approve').length;
    const reject = votes.filter((v) => v.vote === 'reject').length;
    const pending = votes.filter((v) => v.vote === 'pending').length;

    return {
        total,
        approve,
        reject,
        pending,
        approvePercentage: total > 0 ? Math.round((approve / total) * 100) : 0,
        rejectPercentage: total > 0 ? Math.round((reject / total) * 100) : 0,
    };
}