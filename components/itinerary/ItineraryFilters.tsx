// src/components/itinerary/ItineraryFilters.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

export type ItineraryFilter = {
    id: string;
    label: string;
    active?: boolean;
};

type ItineraryFiltersProps = {
    filters: ItineraryFilter[];
    style?: ViewStyle;
    onPressFilter?: (id: string) => void;
};

export function ItineraryFilters({ filters, style, onPressFilter }: ItineraryFiltersProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersRow}
            style={[{ maxHeight: 60 }, style]}
        >
            {filters.map((filter) => {
                const isActive = !!filter.active;
                if (isActive) {
                    return (
                        <TouchableOpacity
                            key={filter.id}
                            style={styles.filterChipActive}
                            onPress={() => onPressFilter?.(filter.id)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.filterChipActiveText}>{filter.label}</Text>
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={filter.id}
                        style={styles.filterChip}
                        onPress={() => onPressFilter?.(filter.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.filterChipText}>{filter.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    filtersRow: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        height: 60,
        columnGap: 8,
    },
    filterChipActive: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: '#FF6B6B',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    filterChipActiveText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    filterChipText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#4b5563',
    },
});
