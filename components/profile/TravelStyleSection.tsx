// src/components/profile/TravelStyleSection.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TravelStyleTag = {
    id: string;
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    active: boolean;
};

type TravelStyleSectionProps = {
    title: string;
    tags: TravelStyleTag[];
    onPressEdit?: () => void;
    onPressTag?: (id: string) => void;
};

export function TravelStyleSection({
    title,
    tags,
    onPressEdit,
    onPressTag,
}: TravelStyleSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity onPress={onPressEdit} activeOpacity={0.8}>
                    <Text style={styles.sectionAction}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tagsRow}>
                {tags.map((tag) => {
                    const TagWrapper = tag.active ? styles.tagActive : styles.tagInactive;
                    const TagTextStyle = tag.active
                        ? styles.tagActiveText
                        : styles.tagInactiveText;
                    const iconColor = tag.active ? '#ffffff' : '#4b5563';

                    return (
                        <TouchableOpacity
                            key={tag.id}
                            style={TagWrapper}
                            onPress={() => onPressTag?.(tag.id)}
                            activeOpacity={0.85}
                        >
                            <Ionicons
                                name={tag.iconName}
                                size={14}
                                color={iconColor}
                                style={{ marginRight: 6 }}
                            />
                            <Text style={TagTextStyle}>{tag.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 18,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    sectionAction: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 8,
        columnGap: 8,
    },
    tagActive: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: '#FF6B6B',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 4,
    },
    tagActiveText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    tagInactive: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    tagInactiveText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#4b5563',
    },
});
