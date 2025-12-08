// src/components/home/PastTripItem.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type PastTripItemProps = {
    imageUrl: string;
    title: string;
    dateText: string; // "Oct 12 - Oct 20, 2023"
    rating?: number;
    tags?: string[];
};

export function PastTripItem({
    imageUrl,
    title,
    dateText,
    rating,
    tags = [],
}: PastTripItemProps) {
    return (
        <View style={styles.pastItem}>
            <View style={styles.pastImageWrapper}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.pastImage}
                />
            </View>

            <View style={styles.pastContent}>
                <View style={styles.pastHeaderRow}>
                    <Text style={styles.pastTitle}>{title}</Text>

                    {typeof rating === 'number' && (
                        <View style={styles.ratingRow}>
                            <Ionicons
                                name="star"
                                size={12}
                                color="#facc15"
                            />
                            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.pastDateText}>
                    <Ionicons
                        name="calendar-outline"
                        size={12}
                        color="#9ca3af"
                    />{' '}
                    {dateText}
                </Text>

                {tags.length > 0 && (
                    <View style={styles.tagsRow}>
                        {tags.map((tag) => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>
                                    {tag.toUpperCase()}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 18,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    pastImageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 12,
    },
    pastImage: {
        width: '100%',
        height: '100%',
    },
    pastContent: {
        flex: 1,
    },
    pastHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    pastTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 11,
        color: '#6b7280',
        fontWeight: '500',
    },
    pastDateText: {
        marginTop: 4,
        fontSize: 11,
        color: '#9ca3af',
    },
    tagsRow: {
        flexDirection: 'row',
        marginTop: 6,
        gap: 6,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: '#f9fafb',
    },
    tagText: {
        fontSize: 9,
        letterSpacing: 1,
        fontWeight: '700',
        color: '#6b7280',
    },
});
