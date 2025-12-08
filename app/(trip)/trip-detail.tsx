// app/(trip)/trip-detail.tsx
import { TripDetailFab } from '@/components/trip/TripDetailFab';
import { TripDetailHeader } from '@/components/trip/TripDetailHeader';
import { TripDetailTabs } from '@/components/trip/TripDetailTabs';
import { TripRecentActivity } from '@/components/trip/TripRecentActivity';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

export default function TripDetailScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <TripDetailHeader
                coverImageUrl="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                countdownLabel="In 12 Days"
                tripTitle="Kyoto Spring 🌸"
                tripDateLabel="Apr 10 - Apr 18, 2024"
                avatars={[
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                ]}
                extraCount={2}
                onBack={() => router.back()}
                onOpenSettings={() => {
                    // TODO: abrir tela de settings da trip
                }}
            />

            <TripDetailTabs
                activeTab="proposals"
                onChangeTab={(tab) => {
                    // TODO: integrar com navegação entre abas
                    // console.log('tab selecionada', tab);
                }}
            />

            <TripRecentActivity />

            <TripDetailFab
                onPress={() => {
                    // TODO: abrir criação de nova proposta / atividade
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
});
