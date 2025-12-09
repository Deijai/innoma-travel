// app/(trip)/trip-detail.tsx
import { CreatePollModal } from '@/components/poll/CreatePollModal';
import { CreateProposalModal } from '@/components/proposal/CreateProposalModal';
import { TripDetailFab } from '@/components/trip/TripDetailFab';
import { TripDetailHeader } from '@/components/trip/TripDetailHeader';
import { TripDetailTabs } from '@/components/trip/TripDetailTabs';
import { TripRecentActivity } from '@/components/trip/TripRecentActivity';
import { getUsersByIds, type AppUser } from '@/services/userService';
import { usePollStore } from '@/stores/pollStore';
import { useProposalStore } from '@/stores/proposalStore';
import { useTripStore } from '@/stores/tripStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    ActivityIndicator,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TripDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { currentTrip, isLoading, fetchTripById } = useTripStore();
    const { fetchProposals } = useProposalStore();
    const { fetchPolls } = usePollStore();

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showCreateProposal, setShowCreateProposal] = useState(false);
    const [showCreatePoll, setShowCreatePoll] = useState(false);

    // 🔥 estado para avatares reais dos membros
    const [memberAvatars, setMemberAvatars] = useState<string[]>([]);
    const [extraMembersCount, setExtraMembersCount] = useState(0);
    const [loadingMembers, setLoadingMembers] = useState(false);

    // Carrega a trip ao montar o componente
    useEffect(() => {
        if (id) {
            console.log('📍 Carregando trip:', id);
            fetchTripById(id);
        }
    }, [id, fetchTripById]);

    // Carrega os usuários (membros) da trip para montar avatares
    useEffect(() => {
        async function loadMembers() {
            if (!currentTrip) {
                setMemberAvatars([]);
                setExtraMembersCount(0);
                return;
            }

            try {
                setLoadingMembers(true);

                // Preferimos memberIds (campo otimizado). Se não tiver, caímos em members.
                const memberIds =
                    currentTrip.memberIds && currentTrip.memberIds.length > 0
                        ? currentTrip.memberIds
                        : currentTrip.members?.map((m) => m.userId) ?? [];

                if (!memberIds.length) {
                    setMemberAvatars([]);
                    setExtraMembersCount(0);
                    return;
                }

                const users: AppUser[] = await getUsersByIds(memberIds);

                const avatars = users
                    .slice(0, 3)
                    .map((user) => {
                        const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || user.email
                        )}`;
                        return user.photoURL ?? fallback;
                    });

                setMemberAvatars(avatars);
                setExtraMembersCount(
                    memberIds.length > 3 ? memberIds.length - 3 : 0
                );
            } catch (error) {
                console.error('❌ Erro ao carregar membros da trip:', error);
                setMemberAvatars([]);
                setExtraMembersCount(0);
            } finally {
                setLoadingMembers(false);
            }
        }

        loadMembers();
    }, [currentTrip]);

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
            const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];
            return `${months[date.getMonth()]} ${date.getDate()}`;
        };

        const startFormatted = formatDate(currentTrip.startDate);
        const endFormatted = formatDate(currentTrip.endDate);
        const year = new Date(currentTrip.startDate).getFullYear();

        return `${startFormatted} - ${endFormatted}, ${year}`;
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
        <SafeAreaView style={styles.container}>
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
            // Opcional: poderia mostrar algum loading dos membros aqui se quiser
            // loadingMembers={loadingMembers}
            />

            <TripDetailTabs
                activeTab="proposals"
                onChangeTab={(tab) => {
                    // TODO: integrar com navegação entre abas
                    console.log('Tab selecionada:', tab);
                }}
            />

            <TripRecentActivity tripId={currentTrip.id} />

            <TripDetailFab
                onPress={() => {
                    console.log('Abrir menu de criação');
                    setShowCreateMenu(true);
                }}
            />

            {/* Menu de seleção */}
            <Modal visible={showCreateMenu} animationType="fade" transparent>
                <TouchableOpacity
                    style={styles.menuBackdrop}
                    activeOpacity={1}
                    onPress={() => setShowCreateMenu(false)}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setShowCreateMenu(false);
                                setShowCreateProposal(true);
                            }}
                        >
                            <View
                                style={[
                                    styles.menuIcon,
                                    { backgroundColor: '#fff5f5' },
                                ]}
                            >
                                <Ionicons
                                    name="restaurant-outline"
                                    size={24}
                                    color="#FF6B6B"
                                />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>
                                    New Proposal
                                </Text>
                                <Text style={styles.menuSubtitle}>
                                    Suggest a place or activity
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setShowCreateMenu(false);
                                setShowCreatePoll(true);
                            }}
                        >
                            <View
                                style={[
                                    styles.menuIcon,
                                    { backgroundColor: '#eff6ff' },
                                ]}
                            >
                                <Ionicons
                                    name="bar-chart-outline"
                                    size={24}
                                    color="#3b82f6"
                                />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>New Poll</Text>
                                <Text style={styles.menuSubtitle}>
                                    Ask the group to vote
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal de criação de proposta */}
            <CreateProposalModal
                visible={showCreateProposal}
                tripId={currentTrip.id}
                onClose={() => setShowCreateProposal(false)}
                onSuccess={() => {
                    fetchProposals(currentTrip.id);
                }}
            />

            {/* Modal de criação de poll */}
            <CreatePollModal
                visible={showCreatePoll}
                tripId={currentTrip.id}
                onClose={() => setShowCreatePoll(false)}
                onSuccess={() => {
                    fetchPolls(currentTrip.id);
                }}
            />
        </SafeAreaView>
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
    menuBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        paddingBottom: 100,
    },
    menuContainer: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 2,
    },
});
