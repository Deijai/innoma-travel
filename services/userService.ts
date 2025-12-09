// services/userService.ts
import { auth, db } from '@/config/firebase';
import {
    collection,
    documentId,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

export type AppUser = {
    id: string;
    name: string;
    username?: string;
    email: string;
    photoURL?: string | null;
};

export async function getAllUsersForTrip(): Promise<AppUser[]> {
    const current = auth.currentUser;
    const q = query(collection(db, 'users'));
    const snap = await getDocs(q);

    const list: AppUser[] = [];

    snap.forEach((docSnap) => {
        const data = docSnap.data() || {};
        const id = docSnap.id;

        // opcional: não listar o próprio usuário como "amigo"
        if (current && current.uid === id) return;

        list.push({
            id,
            name: data.name ?? '',
            username: data.username ?? undefined,
            email: data.email ?? '',
            photoURL: data.photoURL ?? null,
        });
    });

    return list;
}

export async function getUsersByIds(userIds: string[]): Promise<AppUser[]> {
    if (!userIds.length) return [];

    // Firestore limita 'in' a 10 itens — pra viagens pequenas tá ok
    const chunks: string[][] = [];
    for (let i = 0; i < userIds.length; i += 10) {
        chunks.push(userIds.slice(i, i + 10));
    }

    const results: AppUser[] = [];

    for (const chunk of chunks) {
        const q = query(
            collection(db, 'users'),
            where(documentId(), 'in', chunk)
        );

        const snap = await getDocs(q);

        snap.forEach((docSnap) => {
            const data = docSnap.data() || {};
            results.push({
                id: docSnap.id,
                name: data.name ?? '',
                username: data.username ?? undefined,
                email: data.email ?? '',
                photoURL: data.photoURL ?? null,
            });
        });
    }

    return results;
}
