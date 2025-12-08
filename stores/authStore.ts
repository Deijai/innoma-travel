// stores/authStore.ts
// 🔧 Ajuste os paths de import conforme a estrutura do seu projeto.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as authService from '../services/authService';
import type { User } from '../types/user';

type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    hasHydrated: boolean;

    setHasHydrated: (value: boolean) => void;

    signUp: (
        name: string,
        email: string,
        password: string,
        avatarLocalUri?: string
    ) => Promise<User>;

    signIn: (email: string, password: string) => Promise<User>;

    signOut: () => Promise<void>;

    updateProfile: (data: {
        name?: string;
        avatarLocalUri?: string;
    }) => Promise<User>;

    setUserFromFirebase: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            error: null,
            hasHydrated: false,

            setHasHydrated(value) {
                set({ hasHydrated: value });
            },

            async signUp(name, email, password, avatarLocalUri) {
                set({ isLoading: true, error: null });

                try {
                    const user = await authService.signUpWithEmail(
                        name,
                        email,
                        password,
                        avatarLocalUri
                    );

                    set({ user, isLoading: false });
                    return user;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error?.message ?? 'Erro ao criar conta.',
                    });
                    throw error;
                }
            },

            async signIn(email, password) {
                set({ isLoading: true, error: null });

                try {
                    const user = await authService.signInWithEmail(email, password);
                    set({ user, isLoading: false });
                    return user;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error?.message ?? 'Erro ao entrar.',
                    });
                    throw error;
                }
            },

            async signOut() {
                set({ isLoading: true, error: null });

                try {
                    await authService.signOut();
                    set({ user: null, isLoading: false, error: null });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error?.message ?? 'Erro ao sair.',
                    });
                    throw error;
                }
            },

            async updateProfile(data) {
                set({ isLoading: true, error: null });

                try {
                    const user = await authService.updateUserProfile(data);
                    set({ user, isLoading: false });
                    return user;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error?.message ?? 'Erro ao atualizar perfil.',
                    });
                    throw error;
                }
            },

            setUserFromFirebase(user) {
                set({ user });
            },
        }),
        {
            name: 'innoma-travel-auth',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                user: state.user,
            }),
            onRehydrateStorage: () => (state) => {
                // chamado quando terminar de reidratar
                if (state) {
                    state.setHasHydrated(true);
                }
            },
        }
    )
);
