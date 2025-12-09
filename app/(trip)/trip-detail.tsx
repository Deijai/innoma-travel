// app/(trip)/trip-detail.tsx
import { TripProposalsTab } from '@/components/itinerary/TripProposalsTab';
import { CreatePollModal } from '@/components/poll/CreatePollModal';
import { CreateProposalModal } from '@/components/proposal/CreateProposalModal';
import { TripChatScreen } from '@/components/trip/TripChatScreen';
import { TripDetailFab } from '@/components/trip/TripDetailFab';
import { TripDetailHeader } from '@/components/trip/TripDetailHeader';
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

    // Avatares reais dos membros
    const [memberAvatars, setMemberAvatars] = useState<string[]>([]);
    const [extraMembersCount, setExtraMembersCount] = useState(0);

    // Modais de conteúdo
    const [showProposalsModal, setShowProposalsModal] = useState(false);
    const [showItineraryModal, setShowItineraryModal] = useState(false);
    const [showChatModal, setShowChatModal] = useState(false);

    // Menu dentro do modal de Proposals
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    // Modais de criação
    const [showCreateProposal, setShowCreateProposal] = useState(false);
    const [showCreatePoll, setShowCreatePoll] = useState(false);

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

                const avatars = users.slice(0, 3).map((user) => {
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

            {/* HEADER DA VIAGEM */}
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
                    console.log('Abrir settings da trip:', currentTrip.id);
                }}
            />

            {/* AÇÕES PRINCIPAIS DA VIAGEM (sem tabs) */}
            <View style={styles.actionsContainer}>
                <Text style={styles.actionsTitle}>Trip tools</Text>
                <Text style={styles.actionsSubtitle}>
                    Organize ideas, your final plan and talk with your group.
                </Text>

                {/* Proposals & Voting */}
                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => setShowProposalsModal(true)}
                >
                    <View style={styles.actionIcon}>
                        <Ionicons
                            name="bulb-outline"
                            size={22}
                            color="#FF6B6B"
                        />
                    </View>
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>
                            Proposals & Voting
                        </Text>
                        <Text style={styles.actionSubtitleCard}>
                            See ideas, vote and suggest places or activities.
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#9ca3af"
                    />
                </TouchableOpacity>

                {/* Final Itinerary */}
                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => setShowItineraryModal(true)}
                >
                    <View
                        style={[
                            styles.actionIcon,
                            { backgroundColor: '#eff6ff' },
                        ]}
                    >
                        <Ionicons
                            name="calendar-outline"
                            size={22}
                            color="#3b82f6"
                        />
                    </View>
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>Final Itinerary</Text>
                        <Text style={styles.actionSubtitleCard}>
                            See the final day-by-day plan once it&apos;s ready.
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#9ca3af"
                    />
                </TouchableOpacity>

                {/* Group Chat */}
                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => setShowChatModal(true)}
                >
                    <View
                        style={[
                            styles.actionIcon,
                            { backgroundColor: '#fef3c7' },
                        ]}
                    >
                        <Ionicons
                            name="chatbubbles-outline"
                            size={22}
                            color="#f59e0b"
                        />
                    </View>
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>Group Chat</Text>
                        <Text style={styles.actionSubtitleCard}>
                            Talk in real time with everyone in this trip.
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#9ca3af"
                    />
                </TouchableOpacity>
            </View>

            {/* ========== MODAL: PROPOSALS & VOTING ========== */}
            <Modal
                visible={showProposalsModal}
                animationType="slide"
                onRequestClose={() => {
                    setShowProposalsModal(false);
                    setShowCreateMenu(false);
                }}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <StatusBar barStyle="dark-content" />

                    {/* HEADER DO MODAL */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.modalBackButton}
                            onPress={() => {
                                setShowProposalsModal(false);
                                setShowCreateMenu(false);
                            }}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={20}
                                color="#111827"
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalTitle}>
                                Proposals & Voting
                            </Text>
                            <Text style={styles.modalSubtitle}>
                                Vote on ideas and create new suggestions for{' '}
                                {currentTrip.destination}.
                            </Text>
                        </View>
                    </View>

                    {/* CONTEÚDO + FAB + MENU INLINE */}
                    <View style={styles.modalBody}>
                        <TripProposalsTab tripId={currentTrip.id} />

                        {/* FAB em overlay dentro do modal */}
                        <View style={styles.fabOverlay}>
                            <TripDetailFab
                                onPress={() => {
                                    console.log('Abrir menu de criação');
                                    setShowCreateMenu(true);
                                }}
                            />
                        </View>

                        {/* MENU INLINE (SEM OUTRO MODAL) */}
                        {showCreateMenu && (
                            <View style={styles.menuInlineBackdrop}>
                                {/* Fundo que fecha o menu */}
                                <TouchableOpacity
                                    style={styles.menuBackgroundTouchable}
                                    activeOpacity={1}
                                    onPress={() => setShowCreateMenu(false)}
                                />

                                {/* Card com as opções */}
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
                                            <Text style={styles.menuTitle}>
                                                New Poll
                                            </Text>
                                            <Text style={styles.menuSubtitle}>
                                                Ask the group to vote
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </SafeAreaView>
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

            {/* ========== MODAL: FINAL ITINERARY ========== */}
            <Modal
                visible={showItineraryModal}
                animationType="slide"
                onRequestClose={() => setShowItineraryModal(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <StatusBar barStyle="dark-content" />

                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.modalBackButton}
                            onPress={() => setShowItineraryModal(false)}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={20}
                                color="#111827"
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalTitle}>
                                Final Itinerary
                            </Text>
                            <Text style={styles.modalSubtitle}>
                                Soon you&apos;ll be able to organize all
                                approved proposals into a day-by-day plan.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.itineraryPlaceholderModal}>
                        <Ionicons
                            name="map-outline"
                            size={44}
                            color="#9ca3af"
                        />
                        <Text style={styles.itineraryPlaceholderTitle}>
                            No final itinerary yet
                        </Text>
                        <Text style={styles.itineraryPlaceholderSubtitle}>
                            First, use &quot;Proposals & Voting&quot; to choose
                            the best ideas. Then you&apos;ll promote them to the
                            final itinerary and organize by day and time.
                        </Text>
                    </View>
                </SafeAreaView>
            </Modal>

            {/* ========== MODAL: GROUP CHAT ========== */}
            <Modal
                visible={showChatModal}
                animationType="slide"
                onRequestClose={() => setShowChatModal(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <StatusBar barStyle="dark-content" />

                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.modalBackButton}
                            onPress={() => setShowChatModal(false)}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={20}
                                color="#111827"
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalTitle}>Group Chat</Text>
                            <Text style={styles.modalSubtitle}>
                                Talk with everyone who is part of this trip.
                            </Text>
                        </View>
                    </View>

                    {/* Chat em tela cheia dentro do modal */}
                    <View style={styles.chatContainer}>
                        <TripChatScreen tripId={currentTrip.id} />
                    </View>
                </SafeAreaView>
            </Modal>
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
    actionsContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    actionsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    actionsSubtitle: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 4,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        gap: 12,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fee2e2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTextContainer: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    actionSubtitleCard: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        gap: 8,
    },
    modalBackButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },
    modalSubtitle: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 2,
    },
    modalBody: {
        flex: 1,
        position: 'relative',
    },
    fabOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 24,
        paddingBottom: 24,
        pointerEvents: 'box-none',
    },
    itineraryPlaceholderModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    itineraryPlaceholderTitle: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
    },
    itineraryPlaceholderSubtitle: {
        marginTop: 6,
        fontSize: 13,
        color: '#6b7280',
        textAlign: 'center',
    },
    chatContainer: {
        flex: 1,
    },
    // BACKDROP & MENU INLINE (dentro do modal de Proposals)
    menuInlineBackdrop: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        paddingBottom: 100,
    },
    menuBackgroundTouchable: {
        ...StyleSheet.absoluteFillObject,
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
