// app/(trip)/create-trip.tsx  (ou CreateTripScreen.tsx)
import { CoverUploadBox } from '@/components/trip/CoverUploadBox';
import { FriendListItem } from '@/components/trip/FriendListItem';
import { TripBottomBar } from '@/components/trip/TripBottomBar';
import { TripHeader } from '@/components/trip/TripHeader';
import { TripInput } from '@/components/trip/TripInput';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function CreateTripScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <TripHeader
                title="Create New Trip"
                onPressBack={() => { }}
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
                    />

                    {/* Travel Dates */}
                    <View style={styles.fieldBlock}>
                        <Text style={styles.label}>Travel Dates</Text>
                        <View style={styles.datesRow}>
                            <TripInput
                                iconName="calendar-outline"
                                placeholder="Start Date"
                                containerStyle={styles.dateInput}
                            />
                            <TripInput
                                iconName="calendar"
                                placeholder="End Date"
                                containerStyle={styles.dateInput}
                            />
                        </View>
                    </View>
                </View>

                {/* Cover Photo */}
                <View style={styles.section}>
                    <CoverUploadBox onPress={() => { }} />
                </View>

                {/* Travel Squad */}
                <View style={styles.section}>
                    <View style={styles.squadHeaderRow}>
                        <Text style={styles.label}>Travel Squad</Text>
                        <View style={styles.squadBadge}>
                            <Text style={styles.squadBadgeText}>2 Added</Text>
                        </View>
                    </View>

                    {/* Search friends */}
                    <View style={styles.searchWrapper}>
                        <TextInput
                            placeholder="Search friends by username..."
                            placeholderTextColor="#9ca3af"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Friends list */}
                    <View style={styles.friendList}>
                        <FriendListItem
                            avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            name="Sarah Jenkins"
                            username="@sarah_j"
                            online
                            added
                        />

                        <FriendListItem
                            avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            name="Mike Chen"
                            username="@mike_travels"
                            added
                        />

                        <FriendListItem
                            avatarUrl="https://i.pravatar.cc/150?u=a04258114e29026302d"
                            name="Jessica Alva"
                            username="@jess_alva"
                            muted
                            added={false}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom action */}
            <TripBottomBar
                label="Launch Trip Base"
                iconName="rocket-outline"
                onPress={() => { }}
            />
        </View>
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
