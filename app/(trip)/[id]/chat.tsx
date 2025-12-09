import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TripChatScreen } from "@/components/trip/TripChatScreen";
import { useTripStore } from "@/stores/tripStore";

export default function TripChatPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { fetchTripById, currentTrip, isLoading } = useTripStore();

    useEffect(() => {
        if (id) fetchTripById(id);
    }, [id]);

    if (!id) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.error}>ID da viagem inválido</Text>
            </SafeAreaView>
        );
    }

    if (isLoading || !currentTrip) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loading}>Carregando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color="#111" />
                </TouchableOpacity>

                <Text style={styles.tripTitle} numberOfLines={1}>
                    {currentTrip.destination}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <TripChatScreen tripId={id} tripTitle={currentTrip.destination} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    error: { color: "red", fontSize: 16 },
    loading: { marginTop: 8, color: "#555" },
    header: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    tripTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "700",
    },
});
