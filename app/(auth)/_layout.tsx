// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="sign-in"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="sign-up"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="recovery-password"
                options={{ headerShown: false }}
            />

            {/* 🔧 corrigido: arquivo é onboarding.tsx */}
            <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
