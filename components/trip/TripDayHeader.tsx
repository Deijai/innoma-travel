// components/trip/TripDayHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type TripDayItem = {
    label: string;      // ex: "Day 1"
    dayNumber: string;  // ex: "12"
    active?: boolean;
};

type Props = {
    title: string;
    subtitle: string;
    days: TripDayItem[];
    activeIndex?: number;
    onBack?: () => void;
    onSelectDay?: (index: number, day: TripDayItem) => void;
    onPressMenu?: () => void;
};

export function TripDayHeader({
    title,
    subtitle,
    days,
    activeIndex,
    onBack,
    onSelectDay,
    onPressMenu,
}: Props) {
    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    activeOpacity={0.8}
                    onPress={onBack}
                >
                    <Ionicons name="arrow-back" size={18} color="#475569" />
                </TouchableOpacity>

                <View>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.headerSubtitle}>{subtitle}</Text>
                </View>

                <TouchableOpacity
                    style={styles.iconBtn}
                    activeOpacity={0.8}
                    onPress={onPressMenu}
                >
                    <Ionicons name="ellipsis-vertical" size={18} color="#475569" />
                </TouchableOpacity>
            </View>

            {/* Day selector */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daysRow}
            >
                {days.map((day, index) => {
                    const isActive = day.active ?? activeIndex === index;

                    return (
                        <TouchableOpacity
                            key={`${day.label}-${day.dayNumber}-${index}`}
                            activeOpacity={0.9}
                            onPress={() => onSelectDay?.(index, day)}
                            style={isActive ? styles.dayItemActive : styles.dayItem}
                        >
                            <Text style={isActive ? styles.dayLabelActive : styles.dayLabel}>
                                {day.label}
                            </Text>
                            <Text style={isActive ? styles.dayNumberActive : styles.dayNumber}>
                                {day.dayNumber}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 11,
        color: '#64748b',
        textAlign: 'center',
    },
    daysRow: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        columnGap: 10,
    },
    dayItem: {
        width: 64,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayItemActive: {
        width: 64,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 6,
    },
    dayLabel: {
        fontSize: 11,
        color: '#9ca3af',
        fontWeight: '500',
    },
    dayNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4b5563',
    },
    dayLabelActive: {
        fontSize: 11,
        color: '#fef2f2',
        fontWeight: '500',
    },
    dayNumberActive: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
    },
});
