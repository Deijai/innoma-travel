// app/(tabs)/index.tsx
import { FabButton } from '@/components/common/FabButton';
import { HomeHeader } from '@/components/home/HomeHeader';
import { PastTripItem } from '@/components/home/PastTripItem';
import { TripCard } from '@/components/home/TripCard';
import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <HomeHeader
                welcomeText="Welcome back"
                title="My Trips"
                avatarUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
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
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.upcomingScroll}
                    >
                        {/* Card 1 */}
                        <TripCard
                            imageUrl="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                            badgeIcon="time-outline"
                            badgeText="5 Days left"
                            country="Indonesia"
                            title="Bali"
                            participants={[
                                {
                                    avatarUrl:
                                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                                },
                                {
                                    avatarUrl:
                                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                                },
                            ]}
                            extraParticipantsLabel="+2"
                            onPress={() => router.push('/(trip)/trip-detail')}
                        />

                        {/* Card 2 */}
                        <TripCard
                            imageUrl="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                            badgeIcon="calendar-outline"
                            badgeText="Nov 14"
                            country="Japan"
                            title="Kyoto"
                            participants={[
                                {
                                    avatarUrl:
                                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                                },
                            ]}
                        />
                    </ScrollView>
                </View>

                {/* Past Journeys */}
                <View style={[styles.section, { paddingHorizontal: 24 }]}>
                    <Text style={styles.sectionTitle}>Past Journeys</Text>

                    <View style={styles.pastList}>
                        <PastTripItem
                            imageUrl="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            title="Paris, France"
                            dateText="Oct 12 - Oct 20, 2023"
                            rating={4.8}
                            tags={['Leisure', 'Food']}
                        />

                        <PastTripItem
                            imageUrl="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            title="New York, USA"
                            dateText="Jul 04 - Jul 10, 2023"
                            rating={5.0}
                            tags={['Business']}
                        />

                        <PastTripItem
                            imageUrl="https://images.unsplash.com/photo-1580060839134-75a5edca2e27?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            title="Cape Town"
                            dateText="Jan 15 - Jan 25, 2023"
                            rating={4.9}
                            tags={['Adventure']}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* FAB – botão flutuante */}
            <FabButton
                iconName="add"
                onPress={() => {
                    // ex: router.push('/(trip)/create-trip');
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
});
