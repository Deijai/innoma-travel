// app/(trip)/[id]/_layout.tsx
import { Stack } from 'expo-router';

export default function TripIdLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* /trip/[id]/chat */}
            <Stack.Screen name="chat" options={{ presentation: 'fullScreenModal' }} />
        </Stack>
    );
}
