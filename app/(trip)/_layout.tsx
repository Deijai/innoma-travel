// app/(trip)/_layout.tsx
import { Stack } from 'expo-router';

export default function TripGroupLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="trip-detail" />
            <Stack.Screen name="booking" />
            <Stack.Screen name="create-trip" />
            <Stack.Screen name="itinerary-approved" />
            <Stack.Screen
                name="add-suggestion"
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="suggestion-trip" />
            <Stack.Screen name="map-route-trip" />
            <Stack.Screen name="trip-settings" />
            <Stack.Screen name="invite-friends" />
            <Stack.Screen name="suggestions-empty-state" />
            <Stack.Screen name="day-plan-trip" />

            {/* Grupo dinâmico /trip/[id]/... */}
            <Stack.Screen name="[id]" />
        </Stack>
    );
}
