// src/components/profile/ProfileBottomNav.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProfileBottomNavProps = {
    activeTab?: 'explore' | 'saved' | 'chat' | 'profile';
    onPressExplore?: () => void;
    onPressSaved?: () => void;
    onPressCenter?: () => void;
    onPressChat?: () => void;
    onPressProfile?: () => void;
};

export function ProfileBottomNav({
    activeTab = 'profile',
    onPressExplore,
    onPressSaved,
    onPressCenter,
    onPressChat,
    onPressProfile,
}: ProfileBottomNavProps) {
    const isActive = (tab: string) => activeTab === tab;

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.bottomNavItem} onPress={onPressExplore}>
                <Ionicons
                    name="compass-outline"
                    size={20}
                    color={isActive('explore') ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        isActive('explore')
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Explore
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={onPressSaved}>
                <Ionicons
                    name="heart-outline"
                    size={20}
                    color={isActive('saved') ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        isActive('saved')
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Saved
                </Text>
            </TouchableOpacity>

            <View style={styles.bottomCenterWrapper}>
                <TouchableOpacity
                    style={styles.bottomCenterBtn}
                    onPress={onPressCenter}
                >
                    <Ionicons name="add" size={22} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.bottomNavItem} onPress={onPressChat}>
                <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color={isActive('chat') ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        isActive('chat')
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Chat
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={onPressProfile}>
                <Ionicons
                    name="person"
                    size={20}
                    color={isActive('profile') ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        isActive('profile')
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Profile
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomNavItem: {
        alignItems: 'center',
    },
    bottomNavLabel: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
        fontWeight: '500',
    },
    bottomNavLabelActive: {
        fontSize: 10,
        color: '#FF6B6B',
        marginTop: 2,
        fontWeight: '600',
    },
    bottomCenterWrapper: {
        position: 'relative',
        top: -16,
    },
    bottomCenterBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
});
