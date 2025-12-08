// app/index.tsx
import { useAuthStore } from '@/stores/authStore';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const { user, hasHydrated } = useAuthStore();

    if (!hasHydrated) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a',
                }}
            >
                <ActivityIndicator size="large" color="#38bdf8" />
            </View>
        );
    }

    if (user) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/(auth)/sign-in" />;
}
