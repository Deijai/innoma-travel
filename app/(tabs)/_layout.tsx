import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route, }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#FF6B6B',
                tabBarInactiveTintColor: '#94a3b8',
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ color, focused }) => {
                    let iconName:
                        | 'home'
                        | 'home-outline'
                        | 'search'
                        | 'search-outline'
                        | 'map'
                        | 'map-outline'
                        | 'chatbubbles'
                        | 'chatbubbles-outline'
                        | 'person'
                        | 'person-outline';

                    switch (route.name) {
                        case 'index':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'explore':
                            iconName = focused ? 'search' : 'search-outline';
                            break;
                        case 'intinerary': // seu arquivo está com esse nome
                            iconName = focused ? 'map' : 'map-outline';
                            break;
                        case 'chat':
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            break;
                        case 'profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = focused ? 'home' : 'home-outline';
                    }

                    return <Ionicons name={iconName} size={22} color={color} />;
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                }}
            />
            <Tabs.Screen
                name="intinerary"
                options={{
                    title: 'Itinerary',
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 16,
        height: 70,
        borderRadius: 24,
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        paddingTop: 8,
        paddingBottom: 10,
        marginHorizontal: 10,

        // sombra estilo iOS/Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 10,
    },
    tabBarLabel: {
        fontSize: 11,
        marginTop: 2,
    },
});
