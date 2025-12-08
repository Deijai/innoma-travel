// AddSuggestionSheet.tsx
import { BottomSheet } from '@/components/common/BottomSheet';
import { TextAreaWithCounter } from '@/components/common/TextAreaWithCounter';
import { LocationPreviewCard } from '@/components/trip/LocationPreviewCard';
import { LocationSearchBar } from '@/components/trip/LocationSearchBar';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddSuggestionSheet() {
    const [pitch, setPitch] = useState('');

    return (
        <BottomSheet
            title="Add Suggestion"
            onClose={() => { }}
            footer={
                <TouchableOpacity style={styles.postButton} activeOpacity={0.9}>
                    <Ionicons
                        name="send"
                        size={18}
                        color="#fff"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.postButtonText}>Post to Group</Text>
                </TouchableOpacity>
            }
        >
            {/* Location */}
            <View style={styles.section}>
                <Text style={styles.label}>Location</Text>

                <LocationSearchBar
                    defaultValue="The Breakfast Club, Soho"
                    placeholder="Search places, hotels, spots..."
                />

                <LocationPreviewCard
                    name="The Breakfast Club"
                    address="33 D'Arblay St, London W1F 8EU"
                    rating="4.5 ★"
                    meta="Café • $$"
                    onPressEdit={() => { }}
                />
            </View>

            {/* Pitch */}
            <View style={styles.section}>
                <Text style={styles.label}>Why should we go?</Text>
                <TextAreaWithCounter
                    value={pitch}
                    onChangeText={setPitch}
                    placeholder="Best pancakes in town! They don't take reservations so we should go early..."
                    maxLength={200}
                />
            </View>

            {/* Tag a day */}
            <View style={styles.section}>
                <View style={styles.tagHeaderRow}>
                    <Text style={styles.label}>Tag a Day</Text>
                    <Text style={styles.optionalText}>Optional</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dayRow}
                >
                    <TouchableOpacity style={styles.dayChip}>
                        <Text style={styles.dayChipText}>Any Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dayChipActive}>
                        <Ionicons
                            name="calendar-outline"
                            size={14}
                            color="#fff"
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.dayChipActiveText}>Day 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dayChip}>
                        <Text style={styles.dayChipText}>Day 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dayChip}>
                        <Text style={styles.dayChipText}>Day 3</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Category */}
            <View style={[styles.section, { paddingBottom: 40 }]}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryRow}>
                    <View style={styles.categoryChipActive}>
                        <Text style={styles.categoryChipActiveText}>
                            Food &amp; Drink
                        </Text>
                    </View>
                    <View style={styles.categoryChip}>
                        <Text style={styles.categoryChipText}>Sightseeing</Text>
                    </View>
                    <View style={styles.categoryChip}>
                        <Text style={styles.categoryChipText}>Activity</Text>
                    </View>
                    <View style={styles.categoryChip}>
                        <Text style={styles.categoryChipText}>Nightlife</Text>
                    </View>
                </View>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 14,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
    },
    tagHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    optionalText: {
        fontSize: 11,
        color: '#9ca3af',
    },
    dayRow: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        columnGap: 8,
    },
    dayChip: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    dayChipText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#4b5563',
    },
    dayChipActive: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 999,
        backgroundColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 6,
    },
    dayChipActiveText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },

    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 8,
        columnGap: 8,
        marginTop: 6,
    },
    categoryChipActive: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 10,
        backgroundColor: '#fff7ed',
        borderWidth: 1,
        borderColor: '#fed7aa',
    },
    categoryChipActiveText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#ea580c',
    },
    categoryChip: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 10,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    categoryChipText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#6b7280',
    },

    postButton: {
        borderRadius: 18,
        backgroundColor: '#FF6B6B',
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
    },
    postButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
});
