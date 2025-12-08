// src/components/itinerary/SuggestionCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type VoteStyle = 'highlight' | 'muted';

type SuggestionCardProps = {
    imageUrl: string;
    tagIcon: keyof typeof Ionicons.glyphMap;
    tagIconColor: string;
    tagLabel: string;
    tagRightLabel: string;
    title: string;
    description: string;
    rating?: number;

    voteYes: number;
    voteTotal: number;
    voteAvatars: string[];
    voteMoreLabel?: string;
    voteStyle: VoteStyle; // 'highlight' ou 'muted'
    progressPercent: number; // 0 a 100

    primaryVariant: 'solid' | 'outline';
    primaryLabel: string;
    secondaryLabel: string;

    onPrimaryPress?: () => void;
    onSecondaryPress?: () => void;
};

export function SuggestionCard(props: SuggestionCardProps) {
    const {
        imageUrl,
        tagIcon,
        tagIconColor,
        tagLabel,
        tagRightLabel,
        title,
        description,
        rating,
        voteYes,
        voteTotal,
        voteAvatars,
        voteMoreLabel,
        voteStyle,
        progressPercent,
        primaryVariant,
        primaryLabel,
        secondaryLabel,
        onPrimaryPress,
        onSecondaryPress,
    } = props;

    const voteLabelText = `${voteYes}/${voteTotal} Voted Yes`;
    const isHighlight = voteStyle === 'highlight';

    const primaryButtonStyle =
        primaryVariant === 'solid' ? styles.primaryButton : styles.outlinePrimaryButton;
    const primaryTextStyle =
        primaryVariant === 'solid'
            ? styles.primaryButtonText
            : styles.outlinePrimaryButtonText;
    const primaryIconName =
        primaryVariant === 'solid' ? 'thumbs-up' : 'thumbs-up-outline';
    const primaryIconColor = primaryVariant === 'solid' ? '#fff' : '#FF6B6B';

    const progressStyle = isHighlight
        ? styles.progressFillHighlight
        : styles.progressFillMuted;

    const voteLabelStyle = isHighlight
        ? styles.voteLabelHighlight
        : styles.voteLabelMuted;

    return (
        <View style={styles.card}>
            <View style={styles.cardImageWrapper}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.cardImage}
                />

                <View style={styles.cardTagLeft}>
                    <Ionicons
                        name={tagIcon}
                        size={14}
                        color={tagIconColor}
                        style={{ marginRight: 4 }}
                    />
                    <Text style={styles.cardTagLeftText}>{tagLabel}</Text>
                </View>

                <View style={styles.cardTagRight}>
                    <Text style={styles.cardTagRightText}>{tagRightLabel}</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle}>{title}</Text>

                    {typeof rating === 'number' && (
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={14} color="#facc15" />
                            <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.cardDescription}>{description}</Text>

                {/* Voting */}
                <View style={styles.voteBlock}>
                    <View style={styles.voteHeaderRow}>
                        <View style={styles.voteAvatarsRow}>
                            {voteAvatars.map((avatarUrl, index) => (
                                <Image
                                    key={`${avatarUrl}-${index}`}
                                    source={{ uri: avatarUrl }}
                                    style={styles.voteAvatar}
                                />
                            ))}

                            {voteMoreLabel && (
                                <View style={styles.voteMoreAvatar}>
                                    <Text style={styles.voteMoreAvatarText}>
                                        {voteMoreLabel}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Text style={voteLabelStyle}>{voteLabelText}</Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                progressStyle,
                                { width: `${progressPercent}%` },
                            ]}
                        />
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.cardActionsGrid}>
                    <TouchableOpacity
                        style={primaryButtonStyle}
                        activeOpacity={0.85}
                        onPress={onPrimaryPress}
                    >
                        <Ionicons
                            name={primaryIconName}
                            size={18}
                            color={primaryIconColor}
                            style={{ marginRight: 6 }}
                        />
                        <Text style={primaryTextStyle}>{primaryLabel}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        activeOpacity={0.85}
                        onPress={onSecondaryPress}
                    >
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={18}
                            color="#4b5563"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.secondaryButtonText}>
                            {secondaryLabel}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#9ca3af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
    },
    cardImageWrapper: {
        height: 190,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardTagLeft: {
        position: 'absolute',
        top: 14,
        left: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    cardTagLeftText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#111827',
    },
    cardTagRight: {
        position: 'absolute',
        top: 14,
        right: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(15,23,42,0.8)',
    },
    cardTagRightText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
    },
    cardBody: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    cardTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginRight: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        marginLeft: 4,
        fontSize: 13,
        fontWeight: '700',
        color: '#374151',
    },
    cardDescription: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 4,
        marginBottom: 10,
        lineHeight: 18,
    },

    // Vote
    voteBlock: {
        marginBottom: 14,
    },
    voteHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 4,
    },
    voteAvatarsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    voteAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        marginRight: -8,
    },
    voteMoreAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -2,
    },
    voteMoreAvatarText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6b7280',
    },
    voteLabelHighlight: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    voteLabelMuted: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9ca3af',
    },
    progressBackground: {
        width: '100%',
        height: 10,
        borderRadius: 999,
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
        marginTop: 2,
    },
    progressFillHighlight: {
        height: '100%',
        borderRadius: 999,
        backgroundColor: '#FF6B6B',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
    },
    progressFillMuted: {
        height: '100%',
        borderRadius: 999,
        backgroundColor: '#FF6B6B',
        opacity: 0.5,
    },

    // Buttons
    cardActionsGrid: {
        flexDirection: 'row',
        columnGap: 10,
    },
    primaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#FF6B6B',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
    },
    secondaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
    },
    outlinePrimaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#FF6B6B',
    },
    outlinePrimaryButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B6B',
    },
});
