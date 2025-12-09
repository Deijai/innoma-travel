// app/(trip)/create-trip.tsx  (ou CreateTripScreen.tsx)
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { useToast } from '@/components/toast/ToastProvider';
import { CoverUploadBox } from '@/components/trip/CoverUploadBox';
import { FriendListItem } from '@/components/trip/FriendListItem';
import { TripBottomBar } from '@/components/trip/TripBottomBar';
import { TripHeader } from '@/components/trip/TripHeader';
import { TripInput } from '@/components/trip/TripInput';
import { createTrip } from '@/services/tripService';
import type { AppUser } from '@/services/userService';
import { getAllUsersForTrip } from '@/services/userService';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// ⬇️ novo import
import { DateField } from '@/components/form/DateField';

export default function CreateTripScreen() {
    const router = useRouter();
    const { showToast } = useToast();

    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [coverUri, setCoverUri] = useState<string | null>(null);

    const [allUsers, setAllUsers] = useState<AppUser[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    // Carrega lista de usuários quando modal abrir
    useEffect(() => {
        if (!searchModalVisible) return;

        let mounted = true;

        (async () => {
            try {
                setIsLoadingUsers(true);
                const users = await getAllUsersForTrip();
                if (mounted) {
                    setAllUsers(users);
                }
            } catch (error: any) {
                showToast({
                    type: 'error',
                    title: 'Erro ao carregar amigos',
                    message:
                        error?.message ??
                        'Não foi possível carregar a lista de amigos.',
                });
            } finally {
                if (mounted) setIsLoadingUsers(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [searchModalVisible, showToast]);

    const squadCountLabel = useMemo(() => {
        const count = selectedUserIds.length;
        if (count === 0) return '0 Added';
        if (count === 1) return '1 Added';
        return `${count} Added`;
    }, [selectedUserIds.length]);

    const selectedUsersData = useMemo(
        () =>
            allUsers.filter((u) =>
                selectedUserIds.includes(u.id)
            ),
        [allUsers, selectedUserIds]
    );

    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return allUsers;

        const q = searchQuery.trim().toLowerCase();
        return allUsers.filter((u) => {
            const name = u.name?.toLowerCase() ?? '';
            const email = u.email?.toLowerCase() ?? '';
            const username = u.username?.toLowerCase() ?? '';
            return (
                name.includes(q) ||
                email.includes(q) ||
                username.includes(q)
            );
        });
    }, [allUsers, searchQuery]);

    function toggleUserSelection(userId: string) {
        setSelectedUserIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    }

    async function handlePickCover() {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                showToast({
                    type: 'info',
                    title: 'Permissão necessária',
                    message:
                        'Precisamos de acesso às suas fotos para escolher a imagem da capa.',
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.85,
            });

            if (!result.canceled) {
                setCoverUri(result.assets[0].uri);
                showToast({
                    type: 'success',
                    title: 'Capa selecionada',
                    message: 'Sua foto de cover foi atualizada.',
                });
            }
        } catch (error: any) {
            showToast({
                type: 'error',
                title: 'Erro ao selecionar foto',
                message:
                    error?.message ??
                    'Não foi possível selecionar a imagem de capa.',
            });
        }
    }

    function handleOpenFriendsModal() {
        setSearchModalVisible(true);
    }

    function handleCloseFriendsModal() {
        setSearchModalVisible(false);
        setSearchQuery('');
    }

    async function handleCreateTrip() {
        if (!destination.trim()) {
            showToast({
                type: 'info',
                title: 'Destino obrigatório',
                message: 'Informe o destino da viagem.',
            });
            return;
        }
        if (!startDate || !endDate) {
            showToast({
                type: 'info',
                title: 'Datas obrigatórias',
                message:
                    'Informe a data inicial e a data final da viagem.',
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const tripId = await createTrip({
                destination,
                startDate,
                endDate,
                coverLocalUri: coverUri,
                memberIds: selectedUserIds,
            });

            showToast({
                type: 'success',
                title: 'Viagem criada!',
                message:
                    'Seu grupo de viagem foi criado com sucesso. ✈️',
            });

            // Depois você pode trocar para navegar ao detalhe da trip criada
            // tipo: router.push(`/trip/${tripId}`);
            router.back();
        } catch (error: any) {
            showToast({
                type: 'error',
                title: 'Erro ao criar viagem',
                message:
                    error?.message ??
                    'Não foi possível criar a viagem. Tente novamente.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* HEADER */}
                <TripHeader
                    title="Create New Trip"
                    onPressBack={() => router.back()}
                    onPressMenu={() => { }}
                />

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 140 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Trip Details */}
                    <View style={styles.section}>
                        {/* Destination */}
                        <TripInput
                            label="Destination Name"
                            iconName="location-outline"
                            placeholder="e.g. Bali, Indonesia"
                            value={destination}
                            onChangeText={setDestination}
                        />

                        {/* Travel Dates */}
                        <View style={styles.fieldBlock}>
                            <Text style={styles.label}>Travel Dates</Text>
                            <View style={styles.datesRow}>
                                <View style={styles.dateInput}>
                                    <DateField
                                        label="Start"
                                        value={startDate}
                                        onChange={setStartDate}
                                        placeholder="Start Date"
                                    />
                                </View>
                                <View style={styles.dateInput}>
                                    <DateField
                                        label="End"
                                        value={endDate}
                                        onChange={setEndDate}
                                        placeholder="End Date"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Cover Photo */}
                    <View style={styles.section}>
                        <CoverUploadBox onPress={handlePickCover} imageUri={coverUri} />
                        {/* 🔎 Se depois quiser mostrar preview, basta adaptar o CoverUploadBox
                            para aceitar uma prop imageUri={coverUri} mantendo o layout.
                        */}
                    </View>

                    {/* Travel Squad */}
                    <View className="" style={styles.section}>
                        <View style={styles.squadHeaderRow}>
                            <Text style={styles.label}>Travel Squad</Text>
                            <View style={styles.squadBadge}>
                                <Text style={styles.squadBadgeText}>
                                    {squadCountLabel}
                                </Text>
                            </View>
                        </View>

                        {/* Search friends */}
                        <View style={styles.searchWrapper}>
                            <TextInput
                                placeholder="Search friends by username..."
                                placeholderTextColor="#9ca3af"
                                style={styles.searchInput}
                                editable={false}
                                showSoftInputOnFocus={false}
                                onPressIn={handleOpenFriendsModal}
                            />
                        </View>

                        {/* Friends list (selecionados) */}
                        <View style={styles.friendList}>
                            {selectedUsersData.map((u) => (
                                <FriendListItem
                                    key={u.id}
                                    avatarUrl={
                                        u.photoURL ??
                                        `https://i.pravatar.cc/150?u=${u.id}`
                                    }
                                    name={u.name || u.email}
                                    username={
                                        u.username
                                            ? `@${u.username}`
                                            : u.email
                                    }
                                    online={false}
                                    added
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom action */}
                <TripBottomBar
                    label="Launch Trip Base"
                    iconName="rocket-outline"
                    onPress={handleCreateTrip}
                />
            </View>

            {/* Loading da criação */}
            <LoadingOverlay
                visible={isSubmitting}
                text="Criando viagem..."
            />

            {/* Modal de seleção de amigos */}
            <Modal
                visible={searchModalVisible}
                animationType="slide"
                transparent
                onRequestClose={handleCloseFriendsModal}
                style={{ flex: 1 }}
            >
                <View style={modalStyles.backdrop}>
                    <View style={modalStyles.sheet}>
                        <View style={modalStyles.sheetHeader}>
                            <Text style={modalStyles.sheetTitle}>
                                Add Friends
                            </Text>
                            <TouchableOpacity
                                onPress={handleCloseFriendsModal}
                            >
                                <Text style={modalStyles.sheetCloseText}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={modalStyles.searchWrapper}>
                            <TextInput
                                placeholder="Search friends..."
                                placeholderTextColor="#9ca3af"
                                style={modalStyles.searchInput}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        <ScrollView
                            style={modalStyles.list}
                            contentContainerStyle={{ paddingBottom: 16 }}
                        >
                            {isLoadingUsers ? (
                                <Text style={modalStyles.helperText}>
                                    Carregando amigos...
                                </Text>
                            ) : filteredUsers.length === 0 ? (
                                <Text style={modalStyles.helperText}>
                                    Nenhum amigo encontrado.
                                </Text>
                            ) : (
                                filteredUsers.map((u) => {
                                    const isAdded =
                                        selectedUserIds.includes(u.id);

                                    return (
                                        <FriendListItem
                                            key={u.id}
                                            avatarUrl={
                                                u.photoURL ??
                                                `https://i.pravatar.cc/150?u=${u.id}`
                                            }
                                            name={u.name || u.email}
                                            username={
                                                u.username
                                                    ? `@${u.username}`
                                                    : u.email
                                            }
                                            added={isAdded}
                                            online={false}
                                            muted={false}
                                            onPress={() =>
                                                toggleUserSelection(u.id)
                                            }
                                        />
                                    );
                                })
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    section: {
        marginBottom: 24,
    },

    fieldBlock: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        marginLeft: 4,
    },
    datesRow: {
        flexDirection: 'row',
        columnGap: 10,
    },
    dateInput: {
        flex: 1,
        marginBottom: 0, // já controlado pelo fieldBlock pai
    },

    squadHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    squadBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: 'rgba(255,107,107,0.1)',
    },
    squadBadgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FF6B6B',
    },

    searchWrapper: {
        marginTop: 6,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 14,
        paddingHorizontal: 14,
    },
    searchInput: {
        flex: 1,
        fontSize: 13,
        color: '#111827',
        paddingVertical: 8,
    },

    friendList: {
        marginTop: 4,
        rowGap: 8,
    },
});

const modalStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(15,23,42,0.45)',
        justifyContent: 'flex-end',
    },
    sheet: {
        flex: 0.75,
        backgroundColor: '#f9fafb',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    sheetCloseText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    searchWrapper: {
        marginTop: 8,
        marginBottom: 10,
        backgroundColor: '#e5e7eb',
        borderRadius: 14,
        paddingHorizontal: 14,
    },
    searchInput: {
        fontSize: 13,
        color: '#111827',
        paddingVertical: 8,
    },
    list: {
        flex: 1,
        marginTop: 4,
    },
    helperText: {
        fontSize: 13,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 16,
    },
});
