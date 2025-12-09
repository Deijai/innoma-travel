// services/tripService.ts
import { auth, db, storage } from '@/config/firebase';
import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
    where
} from 'firebase/firestore';
import {
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

export type TripMemberRole = 'owner' | 'admin' | 'member';

export type TripMember = {
    userId: string;
    role: TripMemberRole;
};

export type TripStatus = 'upcoming' | 'ongoing' | 'past';

export type Trip = {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    coverPhotoUrl: string | null;
    status: TripStatus;
    members: TripMember[];
    memberIds: string[];
    ownerId: string;
    createdAt: string | null;
    updatedAt: string | null;
};

export type CreateTripInput = {
    destination: string;
    startDate: string; // "2026-01-01"
    endDate: string;
    coverLocalUri?: string | null;
    memberIds: string[];
};

async function uploadCoverIfNeeded(
    localUri?: string | null
): Promise<string | null> {
    if (!localUri) return null;

    const user = auth.currentUser;
    const uid = user?.uid ?? 'anonymous';

    const response = await fetch(localUri);
    const blob = await response.blob();

    const fileRef = ref(
        storage,
        `trip_covers/${uid}/${Date.now()}-cover.jpg`
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

export async function createTrip(input: CreateTripInput): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const coverUrl = await uploadCoverIfNeeded(input.coverLocalUri);

    const ownerMember: TripMember = {
        userId: user.uid,
        role: 'owner',
    };

    const otherMembers: TripMember[] = input.memberIds.map((id) => ({
        userId: id,
        role: 'member' as TripMemberRole,
    }));

    const allMembers = [ownerMember, ...otherMembers];
    const allMemberIds = [user.uid, ...input.memberIds];

    const tripData = {
        destination: input.destination.trim(),
        startDate: input.startDate.trim(),
        endDate: input.endDate.trim(),
        coverPhotoUrl: coverUrl ?? null,
        status: 'upcoming',
        members: allMembers,
        memberIds: allMemberIds, // Array simples de IDs para query
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    console.log('📝 Criando trip com dados:', {
        destination: tripData.destination,
        memberIds: tripData.memberIds,
        ownerId: tripData.ownerId,
    });

    const docRef = await addDoc(collection(db, 'trips'), tripData);

    console.log('✅ Trip criada com ID:', docRef.id);

    return docRef.id;
}

/**
 * Lista todas as viagens que o usuário atual participa
 */
export async function getUserTrips(): Promise<Trip[]> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('Nenhum usuário autenticado.');
    }

    console.log('🔍 Buscando trips para usuário:', user.uid);

    // Query usando memberIds (array simples)
    const q = query(
        collection(db, 'trips'),
        where('memberIds', 'array-contains', user.uid)
    );

    const snap = await getDocs(q);

    console.log('📦 Trips encontradas:', snap.size);

    const trips: Trip[] = [];

    snap.forEach((docSnap) => {
        const data = docSnap.data();

        console.log('📄 Trip:', {
            id: docSnap.id,
            destination: data.destination,
            status: data.status,
        });

        trips.push({
            id: docSnap.id,
            destination: data.destination ?? '',
            startDate: data.startDate ?? '',
            endDate: data.endDate ?? '',
            coverPhotoUrl: data.coverPhotoUrl ?? null,
            status: data.status ?? 'upcoming',
            members: data.members ?? [],
            memberIds: data.memberIds ?? [],
            ownerId: data.ownerId ?? '',
            createdAt: timestampToISO(data.createdAt),
            updatedAt: timestampToISO(data.updatedAt),
        });
    });

    // Ordena por data de criação (mais recentes primeiro)
    trips.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return trips;
}

/**
 * Lista viagens filtrando por status
 */
export async function getTripsByStatus(status: TripStatus): Promise<Trip[]> {
    const allTrips = await getUserTrips();
    const filtered = allTrips.filter(trip => trip.status === status);

    console.log(`🎯 Trips com status '${status}':`, filtered.length);

    return filtered;
}

/**
 * DEBUG: Lista TODAS as trips do Firestore (sem filtro de usuário)
 */
export async function debugGetAllTrips(): Promise<any[]> {
    const q = query(collection(db, 'trips'));
    const snap = await getDocs(q);

    const trips: any[] = [];
    snap.forEach((doc) => {
        trips.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    console.log('🔧 DEBUG - Total de trips no Firestore:', trips.length);
    trips.forEach((trip, index) => {
        console.log(`🔧 Trip ${index + 1}:`, {
            id: trip.id,
            destination: trip.destination,
            memberIds: trip.memberIds,
            ownerId: trip.ownerId,
        });
    });

    return trips;
}

/**
 * Busca uma trip específica por ID
 */
export async function getTripById(tripId: string): Promise<Trip | null> {
    const { doc: docRef, getDoc } = await import('firebase/firestore');

    const tripDocRef = docRef(db, 'trips', tripId);
    const docSnap = await getDoc(tripDocRef);

    if (!docSnap.exists()) {
        console.log('❌ Trip não encontrada:', tripId);
        return null;
    }

    const data = docSnap.data();

    const trip: Trip = {
        id: docSnap.id,
        destination: data.destination ?? '',
        startDate: data.startDate ?? '',
        endDate: data.endDate ?? '',
        coverPhotoUrl: data.coverPhotoUrl ?? null,
        status: data.status ?? 'upcoming',
        members: data.members ?? [],
        memberIds: data.memberIds ?? [],
        ownerId: data.ownerId ?? '',
        createdAt: timestampToISO(data.createdAt),
        updatedAt: timestampToISO(data.updatedAt),
    };

    console.log('✅ Trip encontrada:', trip.destination);

    return trip;
}

/**
 * Migra trips antigas adicionando o campo memberIds
 */
export async function migrateOldTrips(): Promise<void> {
    const { doc: docRef, updateDoc } = await import('firebase/firestore');

    const q = query(collection(db, 'trips'));
    const snap = await getDocs(q);

    let migratedCount = 0;

    for (const docSnap of snap.docs) {
        const data = docSnap.data();

        // Se já tem memberIds, pula
        if (data.memberIds && Array.isArray(data.memberIds)) {
            console.log(`✅ Trip ${docSnap.id} já migrada`);
            continue;
        }

        // Extrai IDs dos membros do array members
        const memberIds: string[] = [];

        if (data.members && Array.isArray(data.members)) {
            data.members.forEach((member: any) => {
                if (member.userId && !memberIds.includes(member.userId)) {
                    memberIds.push(member.userId);
                }
            });
        }

        // Se não tem members, usa o ownerId
        if (memberIds.length === 0 && data.ownerId) {
            memberIds.push(data.ownerId);
        }

        // Atualiza o documento
        if (memberIds.length > 0) {
            const tripDocRef = docRef(db, 'trips', docSnap.id);
            await updateDoc(tripDocRef, { memberIds });

            console.log(`🔄 Trip ${docSnap.id} migrada com memberIds:`, memberIds);
            migratedCount++;
        }
    }

    console.log(`✅ Migração concluída: ${migratedCount} trips atualizadas`);
}