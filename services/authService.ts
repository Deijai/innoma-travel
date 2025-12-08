// services/authService.ts
// 🔧 Ajuste os paths de import conforme a estrutura do seu projeto.

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignIn,
    signOut as firebaseSignOut,
    User as FirebaseUser,
    updateProfile,
} from 'firebase/auth';
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import {
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';

import type { User } from '../types/user';

/**
 * Upload de imagem local (URI do Expo) para o Firebase Storage
 */
async function uploadImageAsync(localUri: string, path: string): Promise<string> {
    const response = await fetch(localUri);
    const blob = await response.blob();

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
}

/**
 * Busca o documento do usuário no Firestore (coleção "users")
 */
async function getUserDocData(uid: string): Promise<any | null> {
    const refDoc = doc(db, 'users', uid);
    const snap = await getDoc(refDoc);
    if (!snap.exists()) return null;
    return snap.data();
}

/**
 * Converte FirebaseUser + doc do Firestore para o nosso tipo User
 */
function mapFirebaseUserToUser(firebaseUser: FirebaseUser, docData?: any | null): User {
    const createdAtRaw = docData?.createdAt;
    const updatedAtRaw = docData?.updatedAt;

    let createdAt: string | null = null;
    let updatedAt: string | null = null;

    if (createdAtRaw?.toDate) {
        createdAt = createdAtRaw.toDate().toISOString();
    } else if (typeof createdAtRaw === 'string') {
        createdAt = createdAtRaw;
    }

    if (updatedAtRaw?.toDate) {
        updatedAt = updatedAtRaw.toDate().toISOString();
    } else if (typeof updatedAtRaw === 'string') {
        updatedAt = updatedAtRaw;
    }

    return {
        id: firebaseUser.uid,
        name: docData?.name ?? firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? docData?.email ?? '',
        photoURL: docData?.photoURL ?? firebaseUser.photoURL ?? null,
        createdAt,
        updatedAt,
    };
}

/**
 * Cria um usuário no Auth + salva dados no Firestore
 * Pode receber um avatar local (URI) para já subir no Storage.
 */
export async function signUpWithEmail(
    name: string,
    email: string,
    password: string,
    avatarLocalUri?: string
): Promise<User> {
    const trimmedEmail = email.trim().toLowerCase();

    if (!name.trim() || !trimmedEmail || !password) {
        throw new Error('Preencha nome, e-mail e senha.');
    }

    if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    const cred = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    const firebaseUser = cred.user;

    let photoURL: string | null = null;

    if (avatarLocalUri) {
        photoURL = await uploadImageAsync(
            avatarLocalUri,
            `users/${firebaseUser.uid}/avatar-${Date.now()}.jpg`
        );
    }

    // Atualiza o profile do Auth
    await updateProfile(firebaseUser, {
        displayName: name.trim(),
        photoURL: photoURL ?? undefined,
    });

    // Cria doc no Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    await setDoc(userDocRef, {
        id: firebaseUser.uid,
        name: name.trim(),
        email: trimmedEmail,
        photoURL: photoURL ?? null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    const docData = await getUserDocData(firebaseUser.uid);
    return mapFirebaseUserToUser(firebaseUser, docData);
}

/**
 * Login com e-mail e senha
 */
export async function signInWithEmail(
    email: string,
    password: string
): Promise<User> {
    const trimmedEmail = email.trim().toLowerCase();

    const cred = await firebaseSignIn(auth, trimmedEmail, password);
    const firebaseUser = cred.user;

    const docData = await getUserDocData(firebaseUser.uid);

    return mapFirebaseUserToUser(firebaseUser, docData);
}

/**
 * Logout
 */
export async function signOut(): Promise<void> {
    await firebaseSignOut(auth);
}

/**
 * Atualiza dados do usuário logado (nome e/ou avatar)
 */
export async function updateUserProfile(data: {
    name?: string;
    avatarLocalUri?: string; // URI local escolhida pelo usuário
}): Promise<User> {
    const current = auth.currentUser;

    if (!current) {
        throw new Error('Nenhum usuário autenticado.');
    }

    const userDocRef = doc(db, 'users', current.uid);
    const userDocSnap = await getDoc(userDocRef);
    const existingDocData = userDocSnap.exists() ? userDocSnap.data() : {};

    let photoURL: string | null =
        existingDocData?.photoURL ?? current.photoURL ?? null;

    // Se veio uma imagem local, faz upload e pega a URL
    if (data.avatarLocalUri) {
        photoURL = await uploadImageAsync(
            data.avatarLocalUri,
            `users/${current.uid}/avatar-${Date.now()}.jpg`
        );
    }

    const newName = data.name !== undefined ? data.name.trim() : existingDocData?.name ?? current.displayName ?? '';

    // Atualiza perfil no Auth
    await updateProfile(current, {
        displayName: newName,
        photoURL: photoURL ?? undefined,
    });

    // Atualiza doc no Firestore
    const updatePayload: any = {
        updatedAt: serverTimestamp(),
    };

    if (data.name !== undefined) updatePayload.name = newName;
    if (data.avatarLocalUri) updatePayload.photoURL = photoURL;

    await updateDoc(userDocRef, updatePayload);

    // Recarrega para garantir dados frescos
    await current.reload();
    const fresh = auth.currentUser!;

    const newDocData = await getUserDocData(fresh.uid);

    return mapFirebaseUserToUser(fresh, newDocData);
}

/**
 * Tenta montar um User a partir do usuário atual do Firebase (se ainda estiver logado).
 */
export async function getCurrentUserFromFirebase(): Promise<User | null> {
    const current = auth.currentUser;
    if (!current) return null;

    const docData = await getUserDocData(current.uid);
    return mapFirebaseUserToUser(current, docData);
}
