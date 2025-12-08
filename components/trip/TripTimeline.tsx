// components/trip/TripTimeline.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type Meridiem = 'AM' | 'PM';

export type TimelineBlock =
    | {
        kind: 'activity';
        time: string;
        meridiem: Meridiem;
        title: string;
        subtitle: string;
        borderColor: string;
        dotColor: string;
        iconName?: keyof typeof Ionicons.glyphMap;
        iconBgColor?: string;
        iconColor?: string;
        duration?: string;
    }
    | {
        kind: 'imageActivity';
        time: string;
        meridiem: Meridiem;
        title: string;
        description: string;
        imageUrl: string;
        distance: string;
        duration: string;
        borderColor: string;
        dotColor: string;
    }
    | {
        kind: 'travelGap';
        label: string;
    }
    | {
        kind: 'freeTime';
        duration: string;
        title: string;
        subtitle: string;
    }
    | {
        kind: 'endOfDay';
        label: string;
    };

type Props = {
    blocks: TimelineBlock[];
    onPressAddActivity?: () => void;
};

export function TripTimeline({ blocks, onPressAddActivity }: Props) {
    return (
        <ScrollView
            style={styles.timeline}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {blocks.map((block, index) => (
                <TimelineBlockRenderer
                    key={`${block.kind}-${index}`}
                    block={block}
                    onPressAddActivity={onPressAddActivity}
                />
            ))}
        </ScrollView>
    );
}

/**  RENDERIZA CADA BLOCO  */

function TimelineBlockRenderer({
    block,
    onPressAddActivity,
}: {
    block: TimelineBlock;
    onPressAddActivity?: () => void;
}) {
    if (block.kind === 'activity') {
        return (
            <TimelineRow time={block.time} meridiem={block.meridiem}>
                <View
                    style={[
                        styles.timelineCol,
                        { borderLeftColor: block.borderColor || '#e5e7eb' },
                    ]}
                >
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: block.dotColor, borderColor: '#ffffff' },
                        ]}
                    />
                    <View
                        style={[
                            styles.card,
                            { borderLeftColor: block.borderColor || '#e5e7eb' },
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.cardTitle}>{block.title}</Text>
                                <Text style={styles.cardSubtitle}>
                                    {block.subtitle}
                                </Text>
                            </View>

                            {block.iconName && (
                                <View
                                    style={[
                                        styles.iconPill,
                                        { backgroundColor: block.iconBgColor },
                                    ]}
                                >
                                    <Ionicons
                                        name={block.iconName}
                                        size={16}
                                        color={block.iconColor || '#000'}
                                    />
                                </View>
                            )}
                        </View>

                        {block.duration && (
                            <View style={styles.cardFooterRow}>
                                <Ionicons
                                    name="time-outline"
                                    size={11}
                                    color="#9ca3af"
                                    style={{ marginRight: 4 }}
                                />
                                <Text style={styles.cardFooterText}>{block.duration}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TimelineRow>
        );
    }

    if (block.kind === 'imageActivity') {
        return (
            <TimelineRow time={block.time} meridiem={block.meridiem}>
                <View
                    style={[
                        styles.timelineCol,
                        { borderLeftColor: block.borderColor || '#e5e7eb' },
                    ]}
                >
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: block.dotColor, borderColor: '#ffffff' },
                        ]}
                    />

                    <View style={styles.cardImageWrapper}>
                        <View style={styles.imageHeader}>
                            <Image
                                source={{ uri: block.imageUrl }}
                                style={styles.image}
                            />
                            <View style={styles.topPickBadge}>
                                <Text style={styles.topPickText}>Top Pick</Text>
                            </View>
                        </View>

                        <View style={styles.cardImageBody}>
                            <Text style={styles.cardTitleLarge}>{block.title}</Text>
                            <Text style={styles.cardSubtitle}>{block.description}</Text>

                            <View style={styles.cardBottomRow}>
                                <View style={styles.locationRow}>
                                    <Ionicons
                                        name="location-outline"
                                        size={11}
                                        color="#FF6B6B"
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text style={styles.cardFooterText}>
                                        {block.distance}
                                    </Text>
                                </View>
                                <View style={styles.durationPill}>
                                    <Text style={styles.durationPillText}>
                                        {block.duration}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TimelineRow>
        );
    }

    if (block.kind === 'travelGap') {
        return (
            <View style={styles.rowGap}>
                <View style={{ width: 56 }} />
                <View style={styles.travelCol}>
                    <View style={styles.travelIconWrapper}>
                        <View style={styles.travelIconCircle}>
                            <Ionicons name="train-outline" size={14} color="#3b82f6" />
                        </View>
                        <Text style={styles.travelText}>{block.label}</Text>
                    </View>
                </View>
            </View>
        );
    }

    if (block.kind === 'freeTime') {
        return (
            <View style={styles.row}>
                <View style={styles.timeCol}>
                    <Text style={styles.gapDuration}>{block.duration}</Text>
                </View>
                <View style={styles.freeTimeCol}>
                    <View style={styles.freeTimeBox}>
                        <Text style={styles.freeTimeTitle}>{block.title}</Text>
                        <Text style={styles.freeTimeSubtitle}>{block.subtitle}</Text>
                        <TouchableOpacity
                            style={styles.freeTimeButton}
                            activeOpacity={0.8}
                            onPress={onPressAddActivity}
                        >
                            <Text style={styles.freeTimeButtonText}>+ Add Activity</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    // endOfDay
    return (
        <View style={styles.rowEnd}>
            <View style={{ width: 56 }} />
            <View style={styles.endCol}>
                <View style={styles.endRow}>
                    <View style={styles.endDot} />
                    <Text style={styles.endText}>{block.label}</Text>
                </View>
            </View>
        </View>
    );
}

/** Linha base do timeline (coluna de horário + conteúdo) */

function TimelineRow({
    time,
    meridiem,
    children,
}: {
    time: string;
    meridiem: Meridiem;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.row}>
            <View style={styles.timeCol}>
                <Text style={styles.timeMain}>{time}</Text>
                <Text style={styles.timeSuffix}>{meridiem}</Text>
            </View>
            {children}
        </View>
    );
}

/** ESTILOS – cópia fiel do original para manter o layout */

const styles = StyleSheet.create({
    timeline: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    timeCol: {
        width: 56,
        alignItems: 'flex-end',
        paddingRight: 6,
        paddingTop: 4,
    },
    timeMain: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0f172a',
    },
    timeSuffix: {
        fontSize: 10,
        color: '#9ca3af',
    },
    timelineCol: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 10,
        borderLeftWidth: 2,
    },
    dot: {
        position: 'absolute',
        top: 6,
        left: -8,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        zIndex: 5,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingLeft: 16,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    cardTitleLarge: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    cardSubtitle: {
        fontSize: 11,
        color: '#6b7280',
        marginTop: 2,
    },
    iconPill: {
        borderRadius: 10,
        padding: 8,
    },
    cardFooterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    cardFooterText: {
        fontSize: 11,
        color: '#9ca3af',
    },

    cardImageWrapper: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    imageHeader: {
        height: 96,
        backgroundColor: '#e5e7eb',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    topPickBadge: {
        position: 'absolute',
        right: 8,
        top: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    topPickText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FF6B6B',
    },
    cardImageBody: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    cardBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationPill: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#fee2e2',
    },
    durationPillText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FF6B6B',
    },

    rowGap: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    travelCol: {
        flex: 1,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#e5e7eb',
        paddingBottom: 8,
    },
    travelIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    travelIconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
        marginRight: 6,
        marginLeft: -19,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    travelText: {
        fontSize: 11,
        color: '#6b7280',
        fontWeight: '500',
    },

    freeTimeCol: {
        flex: 1,
        paddingLeft: 12,
    },
    freeTimeBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#d1d5db',
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        paddingVertical: 12,
        alignItems: 'center',
    },
    freeTimeTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4b5563',
    },
    freeTimeSubtitle: {
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },
    freeTimeButton: {
        marginTop: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    freeTimeButtonText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FF6B6B',
    },
    gapDuration: {
        fontSize: 11,
        color: '#9ca3af',
        fontWeight: '500',
        paddingTop: 18,
    },

    rowEnd: {
        flexDirection: 'row',
        marginTop: 4,
    },
    endCol: {
        flex: 1,
        paddingLeft: 12,
    },
    endRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    endDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d1d5db',
        marginRight: 6,
    },
    endText: {
        fontSize: 11,
        color: '#9ca3af',
    },
});
