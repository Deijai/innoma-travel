// app/(tabs)/index.tsx
import { FabButton } from '@/components/common/FabButton';
import { HomeHeader } from '@/components/home/HomeHeader';
import { PastTripItem } from '@/components/home/PastTripItem';
import { TripCard } from '@/components/home/TripCard';
import { debugGetAllTrips, migrateOldTrips } from '@/services/tripService';
import { useAuthStore } from '@/stores/authStore';
import { useTripStore } from '@/stores/tripStore';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const user = useAuthStore((state) => state.user);
    const { upcomingTrips, pastTrips, isLoading, fetchUpcomingTrips, fetchPastTrips } = useTripStore();
    const [hasMigrated, setHasMigrated] = useState(false);

    // Carrega trips quando a tela ganhar foco
    useFocusEffect(
        useCallback(() => {
            console.log('🏠 Home: Carregando trips...');

            // Roda migração apenas uma vez
            if (!hasMigrated) {
                (async () => {
                    try {
                        console.log('🔄 Iniciando migração de trips antigas...');
                        await migrateOldTrips();
                        setHasMigrated(true);

                        // DEBUG: Lista todas as trips após migração
                        await debugGetAllTrips();

                        // Recarrega as trips
                        fetchUpcomingTrips();
                        fetchPastTrips();
                    } catch (error) {
                        console.error('❌ Erro na migração:', error);
                    }
                })();
            } else {
                // Se já migrou, apenas carrega normalmente
                debugGetAllTrips();
                fetchUpcomingTrips();
                fetchPastTrips();
            }
        }, [fetchUpcomingTrips, fetchPastTrips, hasMigrated])
    );

    // Debug: mostra quantas trips foram carregadas
    React.useEffect(() => {
        console.log('📊 Upcoming trips:', upcomingTrips.length);
        console.log('📊 Past trips:', pastTrips.length);
        if (upcomingTrips.length > 0) {
            console.log('📍 Primeira trip:', upcomingTrips[0]);
        }
    }, [upcomingTrips, pastTrips]);

    // Calcula dias restantes até o início da viagem
    function getDaysLeft(startDateStr: string): string {
        const today = new Date();
        const startDate = new Date(startDateStr);
        const diffTime = startDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Started';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1 Day left';
        return `${diffDays} Days left`;
    }

    // Formata data para exibição (DD/MM/YYYY)
    function formatDate(dateStr: string): string {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    }

    // Formata range de datas
    function formatDateRange(start: string, end: string): string {
        return `${formatDate(start)} - ${formatDate(end)}`;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <HomeHeader
                welcomeText="Welcome back"
                title="My Trips"
                avatarUrl={user?.photoURL ?? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'}
            />

            {/* Conteúdo principal */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Upcoming Adventures */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Upcoming Adventures</Text>
                        {upcomingTrips.length > 2 && (
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FF6B6B" />
                        </View>
                    ) : upcomingTrips.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No upcoming trips yet. Create your first adventure! ✈️
                            </Text>
                        </View>
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.upcomingScroll}
                        >
                            {upcomingTrips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    imageUrl={
                                        trip.coverPhotoUrl ??
                                        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
                                    }
                                    badgeIcon="time-outline"
                                    badgeText={getDaysLeft(trip.startDate)}
                                    country={trip.destination}
                                    title={trip.destination}
                                    participants={trip.members.slice(0, 3).map((m) => ({
                                        avatarUrl: `https://i.pravatar.cc/150?u=${m.userId}`,
                                    }))}
                                    extraParticipantsLabel={
                                        trip.members.length > 3
                                            ? `+${trip.members.length - 3}`
                                            : undefined
                                    }
                                    onPress={() => {
                                        console.log('🎯 Navegando para trip:', trip.id);
                                        router.push(`/(trip)/trip-detail?id=${trip.id}`);
                                    }}
                                />
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Past Journeys */}
                <View style={[styles.section, { paddingHorizontal: 24 }]}>
                    <Text style={styles.sectionTitle}>Past Journeys</Text>

                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FF6B6B" />
                        </View>
                    ) : pastTrips.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No past trips to show yet.
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.pastList}>
                            {pastTrips.map((trip) => (
                                <PastTripItem
                                    key={trip.id}
                                    imageUrl={
                                        trip.coverPhotoUrl ??
                                        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
                                    }
                                    title={trip.destination}
                                    dateText={formatDateRange(trip.startDate, trip.endDate)}
                                    rating={4.5}
                                    tags={['Travel']}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* FAB – botão flutuante */}
            <FabButton
                iconName="add"
                onPress={() => {
                    router.push('/(trip)/create-trip');
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: 16,
    },
    sectionHeaderRow: {
        paddingHorizontal: 24,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    upcomingScroll: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    pastList: {
        marginTop: 12,
        gap: 12,
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyContainer: {
        paddingHorizontal: 24,
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
});