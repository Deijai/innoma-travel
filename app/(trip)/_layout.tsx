import { Stack } from 'expo-router'
import React from 'react'

export default function TripLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="trip-detail" options={{ title: 'Trip Details' }} />
            <Stack.Screen name="booking" options={{ title: 'Booking' }} />
            <Stack.Screen name="create-trip" options={{ title: 'Create Trip' }} />
            <Stack.Screen name="itinerary-approved" options={{ title: 'Itinerary Approved' }} />
            <Stack.Screen name="add-suggestion" options={{ title: 'Add Suggestion', presentation: 'modal' }} />
            <Stack.Screen name="suggestion-trip" options={{ title: 'Suggestion Detail' }} />
            <Stack.Screen name="map-route-trip" options={{ title: 'Map Route Trip' }} />
            <Stack.Screen name="trip-settings" options={{ title: 'Trip Settings' }} />
            <Stack.Screen name="invite-friends" options={{ title: 'Invite Friends' }} />
            <Stack.Screen name="suggestions-empty-state" options={{ title: 'Suggestions Empty State' }} />
            <Stack.Screen name="day-plan-trip" options={{ title: 'Day Plan Trip' }} />
        </Stack>
    )
}