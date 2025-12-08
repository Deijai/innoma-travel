// components/trip/TripPlanBottomNav.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TabKey = 'plan' | 'map' | 'explore' | 'profile';

type Props = {
    activeTab: TabKey;
    onPressPlan?: () => void;
    onPressMap?: () => void;
    onPressExplore?: () => void;
    onPressProfile?: () => void;
};

export function TripPlanBottomNav({
    activeTab,
    onPressPlan,
    onPressMap,
    onPressExplore,
    onPressProfile,
}: Props) {
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                style={
                    activeTab === 'plan'
                        ? styles.bottomNavItemActive
                        : styles.bottomNavItem
                }
                activeOpacity={0.8}
                onPress={onPressPlan}
            >
                <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={activeTab === 'plan' ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        activeTab === 'plan'
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Plan
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.bottomNavItem}
                activeOpacity={0.8}
                onPress={onPressMap}
            >
                <Ionicons
                    name="map-outline"
                    size={20}
                    color={activeTab === 'map' ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        activeTab === 'map'
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Map
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.bottomNavItem}
                activeOpacity={0.8}
                onPress={onPressExplore}
            >
                <Ionicons
                    name="compass-outline"
                    size={20}
                    color={activeTab === 'explore' ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        activeTab === 'explore'
                            ? styles.bottomNavLabelActive
                            : styles.bottomNavLabel
                    }
                >
                    Explore
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.bottomNavItem}
                activeOpacity={0.8}
                onPress={onPressProfile}
            >
                <Ionicons
                    name="person-outline"
                    size={20}
                    color={activeTab === 'profile' ? '#FF6B6B' : '#9ca3af'}
                />
                <Text
                    style={
                        activeTab === 'profile'
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
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomNavItem: {
        alignItems: 'center',
    },
    bottomNavItemActive: {
        alignItems: 'center',
    },
    bottomNavLabel: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
    },
    bottomNavLabelActive: {
        fontSize: 10,
        color: '#FF6B6B',
        marginTop: 2,
        fontWeight: '600',
    },
});
