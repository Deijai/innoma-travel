import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTripStore } from "@/stores/tripStore";

export default function ChatTab() {
    const router = useRouter();
    const { trips, isLoading, fetchTrips } = useTripStore();

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Chats das Viagens</Text>

            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#FF6B6B" />
                </View>
            ) : (
                <FlatList
                    data={trips}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: '/(trip)/[id]/chat',
                                    params: { id: item.id },
                                })
                            }
                        >
                            <Ionicons name="airplane-outline" size={28} color="#FF6B6B" />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{item.destination}</Text>
                                <Text style={styles.dates}>
                                    {item.startDate} → {item.endDate}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        fontSize: 20,
        fontWeight: "700",
        padding: 16,
    },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        marginBottom: 10,
        gap: 12,
    },
    title: { fontSize: 16, fontWeight: "600" },
    dates: { color: "#666", fontSize: 12 },
});
