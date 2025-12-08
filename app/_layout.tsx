import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)/_layout" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/_layout" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
    )
}
