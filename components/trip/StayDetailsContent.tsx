// components/trip/StayDetailsContent.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export function StayDetailsContent() {
    return (
        <ScrollView
            style={styles.bodyWrapper}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.bodyCard}>
                <View style={styles.handle} />

                {/* Header info */}
                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Hidden Oasis Villa</Text>
                        <View style={styles.locationRow}>
                            <Ionicons
                                name="location-outline"
                                size={14}
                                color="#FF6B6B"
                                style={{ marginRight: 4 }}
                            />
                            <Text style={styles.locationText}>
                                Ubud, Bali, Indonesia
                            </Text>
                        </View>
                    </View>
                    <View style={styles.ratingBadge}>
                        <Ionicons
                            name="star"
                            size={12}
                            color="#facc15"
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.ratingText}>4.8</Text>
                    </View>
                </View>

                {/* Suggested by */}
                <View style={styles.suggestedCard}>
                    <View style={styles.suggestedInfo}>
                        <View style={styles.hostAvatarWrapper}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.hostAvatar}
                            />
                            <View style={styles.hostTag}>
                                <Text style={styles.hostTagText}>Host</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.suggestedLabel}>Suggested by</Text>
                            <Text style={styles.suggestedName}>Sarah Jenkins</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={18}
                            color="#9ca3af"
                        />
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.sectionTitle}>About this spot</Text>
                    <Text style={styles.sectionText}>
                        Found this amazing spot! It has a private pool and is super close to
                        the monkey forest. The reviews say the breakfast is incredible.
                        What do you guys think?
                    </Text>
                </View>

                {/* Amenities */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.amenitiesRow}
                >
                    <View style={styles.amenityChip}>
                        <Ionicons
                            name="wifi-outline"
                            size={14}
                            color="#FF6B6B"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.amenityText}>Free Wifi</Text>
                    </View>
                    <View style={styles.amenityChip}>
                        <Ionicons
                            name="water-outline"
                            size={14}
                            color="#FF6B6B"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.amenityText}>Pool</Text>
                    </View>
                    <View style={styles.amenityChip}>
                        <Ionicons
                            name="restaurant-outline"
                            size={14}
                            color="#FF6B6B"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.amenityText}>Breakfast</Text>
                    </View>
                </ScrollView>

                {/* Discussion */}
                <View style={{ marginTop: 20 }}>
                    <View style={styles.discussionHeader}>
                        <Text style={styles.sectionTitle}>Discussion</Text>
                        <View style={styles.discussionBadge}>
                            <Text style={styles.discussionBadgeText}>3 New</Text>
                        </View>
                    </View>

                    <View style={styles.commentsList}>
                        {/* Comment 1 */}
                        <View style={styles.commentRow}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.commentAvatar}
                            />
                            <View style={{ flex: 1 }}>
                                <View style={styles.commentBubble}>
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.commentName}>Mike T.</Text>
                                        <Text style={styles.commentTime}>2h ago</Text>
                                    </View>
                                    <Text style={styles.commentText}>
                                        <Text style={styles.commentMention}>@Sarah </Text>
                                        looks dope! Is breakfast included in that price? 🥞
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Comment 2 */}
                        <View style={styles.commentRow}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.commentAvatar}
                            />
                            <View style={{ flex: 1 }}>
                                <View
                                    style={[
                                        styles.commentBubble,
                                        styles.commentBubbleHost,
                                    ]}
                                >
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.commentName}>
                                            Sarah Jenkins
                                        </Text>
                                        <Text style={styles.commentTime}>1h ago</Text>
                                    </View>
                                    <Text style={styles.commentText}>
                                        <Text style={styles.commentMention}>@Mike </Text>
                                        Yes! Floating breakfast included. I checked the listing
                                        details.
                                    </Text>
                                </View>

                                <View style={styles.reactionRow}>
                                    <View style={styles.reactionChip}>
                                        <Text style={styles.reactionText}>🔥 2</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Comment 3 */}
                        <View style={styles.commentRow}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.commentAvatar}
                            />
                            <View style={{ flex: 1 }}>
                                <View style={styles.commentBubble}>
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.commentName}>Jessica Lee</Text>
                                        <Text style={styles.commentTime}>Just now</Text>
                                    </View>
                                    <Text style={styles.commentText}>
                                        Love the vibe. I'm totally in. Let's book it before
                                        it's gone!
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Input */}
                    <View style={styles.commentInputRow}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                            }}
                            style={styles.commentAvatar}
                        />
                        <View style={styles.commentInputWrapper}>
                            <TextInput
                                placeholder="Add a comment..."
                                placeholderTextColor="#9ca3af"
                                style={styles.commentInput}
                            />
                            <TouchableOpacity style={styles.commentSendButton}>
                                <Ionicons
                                    name="send"
                                    size={16}
                                    color="#FF6B6B"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bodyWrapper: {
        flex: 1,
        marginTop: -24, // igual original, pra card sobrepor o hero
    },
    bodyCard: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
    },
    handle: {
        width: 48,
        height: 5,
        borderRadius: 999,
        backgroundColor: '#e5e7eb',
        alignSelf: 'center',
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 13,
        color: '#6b7280',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#fef9c3',
        borderWidth: 1,
        borderColor: '#fef3c7',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
    },

    suggestedCard: {
        marginTop: 18,
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    suggestedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hostAvatarWrapper: {
        marginRight: 10,
    },
    hostAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    hostTag: {
        position: 'absolute',
        bottom: -4,
        right: -6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: '#FF6B6B',
        borderWidth: 1,
        borderColor: '#ffffff',
    },
    hostTagText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#ffffff',
    },
    suggestedLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#9ca3af',
        fontWeight: '600',
    },
    suggestedName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    sectionText: {
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 20,
    },

    amenitiesRow: {
        marginTop: 10,
        paddingRight: 10,
        columnGap: 8,
    },
    amenityChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#f3f4f6',
    },
    amenityText: {
        fontSize: 11,
        color: '#4b5563',
        fontWeight: '500',
    },

    discussionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 6,
    },
    discussionBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: 'rgba(255,107,107,0.1)',
    },
    discussionBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FF6B6B',
    },
    commentsList: {
        rowGap: 10,
    },
    commentRow: {
        flexDirection: 'row',
        columnGap: 8,
        marginTop: 6,
    },
    commentAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    commentBubble: {
        backgroundColor: '#f3f4f6',
        borderRadius: 16,
        borderTopLeftRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    commentBubbleHost: {
        backgroundColor: 'rgba(255,107,107,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,107,107,0.15)',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    commentName: {
        fontSize: 11,
        fontWeight: '700',
        color: '#111827',
    },
    commentTime: {
        fontSize: 10,
        color: '#9ca3af',
    },
    commentText: {
        fontSize: 13,
        color: '#4b5563',
    },
    commentMention: {
        color: '#FF6B6B',
        fontWeight: '600',
    },
    reactionRow: {
        flexDirection: 'row',
        marginTop: 4,
        marginLeft: 6,
    },
    reactionChip: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    reactionText: {
        fontSize: 10,
        color: '#111827',
    },

    commentInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        columnGap: 8,
    },
    commentInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 999,
        paddingHorizontal: 12,
    },
    commentInput: {
        flex: 1,
        fontSize: 13,
        color: '#111827',
        paddingVertical: 6,
    },
    commentSendButton: {
        paddingLeft: 6,
    },
});
