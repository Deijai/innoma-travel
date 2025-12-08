import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function AuthLayout() {
    return (
        <Stack>
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

            <Stack.Screen
                name="onbiarding"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}

const styles = StyleSheet.create({})