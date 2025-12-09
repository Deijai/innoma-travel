// app/_layout.tsx
import { ToastProvider } from '@/components/toast/ToastProvider';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
    return (
        <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>
                {/* Grupo de tabs principal */}
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />

                {/* Fluxo de auth como modal */}
                <Stack.Screen
                    name="(auth)"
                    options={{ presentation: 'modal', headerShown: false }}
                />

                {/* Grupo de rotas de viagem */}
                <Stack.Screen
                    name="(trip)"
                    options={{ headerShown: false }}
                />
            </Stack>
        </ToastProvider>
    );
}
