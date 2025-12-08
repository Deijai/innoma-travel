// components/trip/TripDetailTabs.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TripDetailTabKey = 'proposals' | 'itinerary' | 'chat';

type Props = {
    activeTab: TripDetailTabKey;
    onChangeTab?: (tab: TripDetailTabKey) => void;
};

export function TripDetailTabs({ activeTab, onChangeTab }: Props) {
    const handlePress = (tab: TripDetailTabKey) => {
        if (onChangeTab) onChangeTab(tab);
    };

    return (
        <View style={styles.tabsContainer}>
            <View style={styles.tabsRow}>
                <TouchableOpacity
                    style={
                        activeTab === 'proposals' ? styles.tabActive : styles.tab
                    }
                    activeOpacity={0.8}
                    onPress={() => handlePress('proposals')}
                >
                    <Text
                        style={
                            activeTab === 'proposals'
                                ? styles.tabActiveText
                                : styles.tabText
                        }
                    >
                        Proposals
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        activeTab === 'itinerary' ? styles.tabActive : styles.tab
                    }
                    activeOpacity={0.8}
                    onPress={() => handlePress('itinerary')}
                >
                    <Text
                        style={
                            activeTab === 'itinerary'
                                ? styles.tabActiveText
                                : styles.tabText
                        }
                    >
                        Final Itinerary
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={activeTab === 'chat' ? styles.tabActive : styles.tab}
                    activeOpacity={0.8}
                    onPress={() => handlePress('chat')}
                >
                    <Text
                        style={
                            activeTab === 'chat'
                                ? styles.tabActiveText
                                : styles.tabText
                        }
                    >
                        Group Chat
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabsContainer: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    tabsRow: {
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabText: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    tabActive: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FF6B6B',
    },
    tabActiveText: {
        fontSize: 14,
        color: '#FF6B6B',
        fontWeight: '700',
    },
});
