// app/(trip)/trip-detail.tsx
import { TripDetailFab } from '@/components/trip/TripDetailFab';
import { TripDetailHeader } from '@/components/trip/TripDetailHeader';
import { TripDetailTabs } from '@/components/trip/TripDetailTabs';
import { TripRecentActivity } from '@/components/trip/TripRecentActivity';
import { useTripStore } from '@/stores/tripStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function TripDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { currentTrip, isLoading, fetchTripById } = useTripStore();

    // Carrega a trip ao montar o componente
    useEffect(() => {
        if (id) {
            console.log('📍 Carregando trip:', id);
            fetchTripById(id);
        }
    }, [id, fetchTripById]);

    // Calcula dias restantes até o início da viagem
    const daysLeft = useMemo(() => {
        if (!currentTrip) return '';

        const today = new Date();
        const startDate = new Date(currentTrip.startDate);
        const diffTime = startDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Started';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'In 1 Day';
        return `In ${diffDays} Days`;
    }, [currentTrip]);

    // Formata range de datas
    const dateRange = useMemo(() => {
        if (!currentTrip) return '';

        const formatDate = (dateStr: string) => {
            const date = new Date(dateStr);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[date.getMonth()]} ${date.getDate()}`;
        };

        const startFormatted = formatDate(currentTrip.startDate);
        const endFormatted = formatDate(currentTrip.endDate);
        const year = new Date(currentTrip.startDate).getFullYear();

        return `${startFormatted} - ${endFormatted}, ${year}`;
    }, [currentTrip]);

    // Avatares dos membros
    const memberAvatars = useMemo(() => {
        if (!currentTrip) return [];

        return currentTrip.members.slice(0, 3).map((member) =>
            `https://i.pravatar.cc/150?u=${member.userId}`
        );
    }, [currentTrip]);

    const extraMembersCount = useMemo(() => {
        if (!currentTrip || currentTrip.members.length <= 3) return 0;
        return currentTrip.members.length - 3;
    }, [currentTrip]);

    // Loading state
    if (isLoading || !currentTrip) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <StatusBar barStyle="dark-content" />
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Loading trip...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <TripDetailHeader
                coverImageUrl={
                    currentTrip.coverPhotoUrl ??
                    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                }
                countdownLabel={daysLeft}
                tripTitle={currentTrip.destination}
                tripDateLabel={dateRange}
                avatars={memberAvatars}
                extraCount={extraMembersCount}
                onBack={() => router.back()}
                onOpenSettings={() => {
                    // TODO: abrir tela de settings da trip
                    console.log('Abrir settings da trip:', currentTrip.id);
                }}
            />

            <TripDetailTabs
                activeTab="proposals"
                onChangeTab={(tab) => {
                    // TODO: integrar com navegação entre abas
                    console.log('Tab selecionada:', tab);
                }}
            />

            <TripRecentActivity />

            <TripDetailFab
                onPress={() => {
                    // TODO: abrir criação de nova proposta / atividade
                    console.log('Criar nova proposta para trip:', currentTrip.id);
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
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#6b7280',
    },
});