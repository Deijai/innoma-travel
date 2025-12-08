// app/(trip)/day-plan.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { TripDayHeader } from '@/components/trip/TripDayHeader';
import { TripPlanBottomNav } from '@/components/trip/TripPlanBottomNav';
import { TripPlanFab } from '@/components/trip/TripPlanFab';
import {
    TimelineBlock,
    TripTimeline,
} from '@/components/trip/TripTimeline';

const DAYS = [
    { label: 'Day 1', dayNumber: '12', active: false },
    { label: 'Day 2', dayNumber: '13', active: true },
    { label: 'Day 3', dayNumber: '14', active: false },
    { label: 'Day 4', dayNumber: '15', active: false },
    { label: 'Day 5', dayNumber: '16', active: false },
];

const DAY2_TIMELINE: TimelineBlock[] = [
    {
        kind: 'activity',
        time: '08:00',
        meridiem: 'AM',
        title: 'Hotel Breakfast',
        subtitle: 'Ryokan Yamazaki',
        borderColor: '#facc15',
        dotColor: '#facc15',
        iconName: 'cafe-outline',
        iconBgColor: '#fef9c3',
        iconColor: '#ca8a04',
        duration: '1h 00m',
    },
    {
        kind: 'imageActivity',
        time: '09:30',
        meridiem: 'AM',
        title: 'Fushimi Inari Shrine',
        description: 'Famous for its thousands of vermilion torii gates.',
        imageUrl:
            'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=600&q=80',
        distance: '2.4km away',
        duration: '2h 00m',
        borderColor: '#FF6B6B',
        dotColor: '#FF6B6B',
    },
    {
        kind: 'travelGap',
        label: 'Travel to Nishiki Market (20m)',
    },
    {
        kind: 'activity',
        time: '12:00',
        meridiem: 'PM',
        title: 'Street Food Tour',
        subtitle: 'Nishiki Market',
        borderColor: '#22c55e',
        dotColor: '#22c55e',
        iconName: 'restaurant-outline',
        iconBgColor: '#dcfce7',
        iconColor: '#22c55e',
    },
    {
        kind: 'freeTime',
        duration: '1h 30m',
        title: 'Free Time',
        subtitle: 'Explore nearby shops',
    },
    {
        kind: 'activity',
        time: '15:00',
        meridiem: 'PM',
        title: 'Traditional Tea Ceremony',
        subtitle: 'Camellia Flower Teahouse',
        borderColor: '#a855f7',
        dotColor: '#a855f7',
        iconName: 'leaf-outline',
        iconBgColor: '#f5f3ff',
        iconColor: '#7c3aed',
        duration: '1h 30m',
    },
    {
        kind: 'endOfDay',
        label: 'End of scheduled activities',
    },
];

export default function DayPlanScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <TripDayHeader
                title="Kyoto Adventure"
                subtitle="Oct 12 - Oct 18"
                days={DAYS}
                activeIndex={1}
                onBack={() => router.back()}
                onSelectDay={() => {
                    // aqui depois você pode trocar o dia e recarregar o timeline
                }}
                onPressMenu={() => {
                    // abrir menu de opções
                }}
            />

            <TripTimeline
                blocks={DAY2_TIMELINE}
                onPressAddActivity={() => {
                    // abrir AddSuggestionSheet
                }}
            />

            <TripPlanFab
                onPress={() => {
                    // abrir AddSuggestionSheet ou tela de criação de atividade
                }}
            />

            {/* Se você já usa Tabs do expo-router, esse bottom nav é só visual.
               Depois pode trocar pelos Tabs reais. */}
            <TripPlanBottomNav
                activeTab="plan"
                onPressPlan={() => { /* já está na tela */ }}
                onPressMap={() => { /* router.push('/(trip)/map'); */ }}
                onPressExplore={() => { /* router.push('/(tabs)/explore'); */ }}
                onPressProfile={() => { /* router.push('/(tabs)/profile'); */ }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
});
