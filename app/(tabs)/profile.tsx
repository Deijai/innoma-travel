// app/(tabs)/profile.tsx  (ou TravelProfileScreen.tsx)
import { LinkedAccountsCard } from '@/components/profile/LinkedAccountsCard';
import { NotificationsCard } from '@/components/profile/NotificationsCard';
import { ProfileBottomNav } from '@/components/profile/ProfileBottomNav';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTopCard } from '@/components/profile/ProfileTopCard';
import { TravelStyleSection } from '@/components/profile/TravelStyleSection';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, signOut, updateProfile, isLoading } = useAuthStore();
    const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

    const displayName = user?.name || 'Sarah Jenkins';
    const avatarUrl =
        user?.photoURL ||
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=256&h=256&q=80';
    const locationLabel = 'San Francisco, CA'; // ou algo dinâmico depois, se quiser

    const handleEditAvatar = useCallback(async () => {
        try {
            setIsUpdatingAvatar(true);

            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permissão negada',
                    'Precisamos de acesso às fotos para alterar o avatar.'
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (result.canceled) return;

            const uri = result.assets[0].uri;

            await updateProfile({ avatarLocalUri: uri });

            Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } catch (error: any) {
            Alert.alert(
                'Erro',
                error?.message ?? 'Não foi possível atualizar a foto de perfil.'
            );
        } finally {
            setIsUpdatingAvatar(false);
        }
    }, [updateProfile]);

    const handleLogout = useCallback(async () => {
        try {
            await signOut();

            router.replace('/(auth)/sign-in');
        } catch (error: any) {
            Alert.alert('Erro', error?.message ?? 'Não foi possível sair da conta.');
        }
    }, [signOut, router]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <ProfileHeader
                title="Profile"
                onPressSettings={() => { }}
            />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile top */}
                <ProfileTopCard
                    avatarUrl={avatarUrl}
                    name={displayName}
                    location={locationLabel}
                    onPressEditAvatar={handleEditAvatar}
                />

                <View style={styles.main}>
                    {/* Travel style */}
                    <TravelStyleSection
                        title="Travel Style"
                        tags={[
                            {
                                id: 'early-bird',
                                label: 'Early Bird',
                                iconName: 'cafe-outline',
                                active: true,
                            },
                            {
                                id: 'foodie',
                                label: 'Foodie',
                                iconName: 'restaurant-outline',
                                active: true,
                            },
                            {
                                id: 'nature',
                                label: 'Nature',
                                iconName: 'leaf-outline',
                                active: false,
                            },
                            {
                                id: 'photography',
                                label: 'Photography',
                                iconName: 'camera-outline',
                                active: false,
                            },
                            {
                                id: 'luxury',
                                label: 'Luxury',
                                iconName: 'diamond-outline',
                                active: true,
                            },
                        ]}
                        onPressEdit={() => { }}
                        onPressTag={() => { }}
                    />

                    {/* Notifications */}
                    <NotificationsCard
                        title="Notifications"
                        items={[
                            {
                                id: 'new-suggestions',
                                iconName: 'bulb-outline',
                                iconBg: '#fee2e2',
                                title: 'New Suggestions',
                                subtitle: 'Get notified for new trip ideas',
                                enabled: true,
                            },
                            {
                                id: 'group-votes',
                                iconName: 'checkbox-outline',
                                iconBg: '#fee2e2',
                                title: 'Group Votes',
                                subtitle: 'Alerts when friends vote',
                                enabled: true,
                            },
                        ]}
                    />

                    {/* Linked accounts */}
                    <LinkedAccountsCard
                        title="Linked Accounts"
                        accounts={[
                            {
                                id: 'google-calendar',
                                iconName: 'calendar-outline',
                                iconBg: '#eff6ff',
                                iconColor: '#3b82f6',
                                title: 'Google Calendar',
                                status: 'synced',
                            },
                            {
                                id: 'spotify',
                                iconName: 'musical-notes-outline',
                                iconBg: '#ecfdf3',
                                iconColor: '#22c55e',
                                title: 'Spotify',
                                status: 'disconnected',
                            },
                        ]}
                        onPressConnect={() => { }}
                        onPressMore={() => { }}
                    />

                    {/* Logout */}
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={handleLogout}
                        disabled={isLoading || isUpdatingAvatar}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={16}
                            color="#FF6B6B"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <View style={styles.versionWrapper}>
                        <Text style={styles.versionText}>WanderWe v2.4.0</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom nav fake (layout) */}
            <ProfileBottomNav
                activeTab="profile"
                onPressExplore={() => { }}
                onPressSaved={() => { }}
                onPressCenter={() => { }}
                onPressChat={() => { }}
                onPressProfile={() => { }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    main: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    logoutBtn: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#fecaca',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 2,
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    versionWrapper: {
        marginTop: 10,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 11,
        color: '#9ca3af',
    },
});
