// services/userService.ts
import { auth, db } from '@/config/firebase';
import {
    collection,
    getDocs,
    query,
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
