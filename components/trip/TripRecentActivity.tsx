// components/trip/TripRecentActivity.tsx
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

export function TripRecentActivity() {
    return (
        <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header seção */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <TouchableOpacity>
                    <Text style={styles.sectionSeeAll}>View All</Text>
                </TouchableOpacity>
            </View>

            {/* CARD 1 – PROPOSTA RESTAURANTE */}
            <View style={styles.card}>
                {/* Top do card */}
                <View style={styles.cardHeaderRow}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        }}
                        style={styles.cardAvatar}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardHeaderText}>
                            <Text style={styles.cardHeaderName}>Sarah</Text> suggested a
                            restaurant
                        </Text>
                        <Text style={styles.cardHeaderTime}>2 hours ago</Text>
                    </View>
                    <View style={styles.tagDinner}>
                        <Text style={styles.tagDinnerText}>DINNER</Text>
                    </View>
                </View>

                {/* Imagem restaurante */}
                <View style={styles.cardImageWrapper}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                        }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardPriceBadge}>
                        <Text style={styles.cardPriceText}>$$$</Text>
                    </View>
                </View>

                {/* Conteúdo texto */}
                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>Ichiran Ramen Kyoto</Text>
                    <Text style={styles.cardDescription}>
                        Famous tonkotsu ramen chain with solo dining booths. A must-visit
                        for the classic experience!
                    </Text>

                    <View style={styles.cardFooterRow}>
                        <View style={styles.voteStatusRow}>
                            <View style={styles.voteCircleApproved}>
                                <Ionicons
                                    name="checkmark"
                                    size={10}
                                    color="#16a34a"
                                />
                            </View>
                            <View style={styles.voteCircleApproved}>
                                <Ionicons
                                    name="checkmark"
                                    size={10}
                                    color="#16a34a"
                                />
                            </View>
                            <View style={styles.voteCirclePending}>
                                <Text style={styles.voteCirclePendingText}>?</Text>
                            </View>
                        </View>

                        <View style={styles.cardActionsRow}>
                            <TouchableOpacity style={styles.actionReject}>
                                <Ionicons
                                    name="close"
                                    size={16}
                                    color="#9ca3af"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionLike}>
                                <Ionicons
                                    name="heart"
                                    size={18}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* CARD 2 – POLL */}
            <View style={styles.card}>
                <View style={styles.cardHeaderRow}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        }}
                        style={styles.cardAvatar}
                    />
                    <View>
                        <Text style={styles.cardHeaderText}>
                            <Text style={styles.cardHeaderName}>Mike</Text> created a poll
                        </Text>
                        <Text style={styles.cardHeaderTime}>4 hours ago</Text>
                    </View>
                </View>

                <Text style={styles.pollTitle}>
                    Which day for Universal Studios? 🎢
                </Text>

                <View style={styles.pollOptions}>
                    {/* Opção 1 */}
                    <View style={{ marginBottom: 12 }}>
                        <View style={styles.pollRow}>
                            <Text style={styles.pollOptionLabel}>
                                Tuesday, Apr 12
                            </Text>
                            <Text style={styles.pollOptionValueActive}>75%</Text>
                        </View>
                        <View style={styles.pollBarBackground}>
                            <View
                                style={[styles.pollBarFillActive, { width: '75%' }]}
                            />
                        </View>
                        <View style={styles.pollAvatarRow}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.pollAvatar}
                            />
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.pollAvatar}
                            />
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                }}
                                style={styles.pollAvatar}
                            />
                        </View>
                    </View>

                    {/* Opção 2 */}
                    <View style={{ opacity: 0.6 }}>
                        <View style={styles.pollRow}>
                            <Text style={styles.pollOptionLabel}>
                                Wednesday, Apr 13
                            </Text>
                            <Text style={styles.pollOptionValue}>25%</Text>
                        </View>
                        <View style={styles.pollBarBackground}>
                            <View
                                style={[styles.pollBarFillInactive, { width: '25%' }]}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* CARD 3 – CHAT SNIPPET */}
            <View style={styles.cardRow}>
                <View style={styles.chatIconBox}>
                    <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={18}
                        color="#3b82f6"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.chatTitle}>
                        New message in Group Chat
                    </Text>
                    <Text style={styles.chatSubtitle}>
                        Alex: "Did anyone book the JR Pass?"
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.chatReply}>Reply</Text>
                </TouchableOpacity>
            </View>

            {/* CARD 4 – ITINERARY UPDATE */}
            <View style={styles.card}>
                <View style={styles.cardHeaderRow}>
                    <View style={styles.botIconBox}>
                        <Ionicons
                            name="sparkles-outline"
                            size={16}
                            color="#7c3aed"
                        />
                    </View>
                    <View>
                        <Text style={styles.cardHeaderText}>
                            <Text style={styles.cardHeaderName}>WanderWe Bot</Text> added
                            to itinerary
                        </Text>
                        <Text style={styles.cardHeaderTime}>Yesterday</Text>
                    </View>
                </View>

                <View style={styles.itineraryBox}>
                    <View style={styles.itineraryDateBox}>
                        <Text style={styles.itineraryMonth}>Apr</Text>
                        <Text style={styles.itineraryDay}>10</Text>
                    </View>
                    <View style={styles.itineraryDivider} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itineraryTitle}>
                            Check-in: Ryokan Yamazaki
                        </Text>
                        <Text style={styles.itinerarySubtitle}>
                            3:00 PM • Confirmation #88291
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    sectionHeader: {
        marginTop: 4,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    sectionSeeAll: {
        fontSize: 11,
        color: '#FF6B6B',
        fontWeight: '600',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        marginTop: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    cardAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    cardHeaderText: {
        fontSize: 13,
        color: '#111827',
    },
    cardHeaderName: {
        fontWeight: '700',
    },
    cardHeaderTime: {
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },
    tagDinner: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#fed7aa',
    },
    tagDinnerText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#c05621',
    },

    cardImageWrapper: {
        height: 150,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardPriceBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    cardPriceText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#111827',
    },

    cardBody: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    cardDescription: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 4,
    },
    cardFooterRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    voteStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    voteCircleApproved: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#dcfce7',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -4,
    },
    voteCirclePending: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -4,
    },
    voteCirclePendingText: {
        fontSize: 11,
        color: '#9ca3af',
        fontWeight: '600',
    },

    cardActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionReject: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionLike: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 4,
    },

    pollTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        paddingHorizontal: 14,
        marginTop: 6,
    },
    pollOptions: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    pollRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    pollOptionLabel: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    pollOptionValueActive: {
        fontSize: 13,
        color: '#FF6B6B',
        fontWeight: '700',
    },
    pollOptionValue: {
        fontSize: 13,
        color: '#6b7280',
        fontWeight: '600',
    },
    pollBarBackground: {
        width: '100%',
        height: 10,
        borderRadius: 999,
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
    },
    pollBarFillActive: {
        height: '100%',
        backgroundColor: '#FF6B6B',
        borderRadius: 999,
    },
    pollBarFillInactive: {
        height: '100%',
        backgroundColor: '#d1d5db',
        borderRadius: 999,
    },
    pollAvatarRow: {
        flexDirection: 'row',
        marginTop: 4,
        marginLeft: 4,
    },
    pollAvatar: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: -4,
    },

    cardRow: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        marginTop: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    chatIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    chatTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    chatSubtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    chatReply: {
        fontSize: 13,
        color: '#FF6B6B',
        fontWeight: '600',
    },

    botIconBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ede9fe',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    itineraryBox: {
        marginHorizontal: 14,
        marginBottom: 14,
        marginTop: 6,
        backgroundColor: '#f9fafb',
        borderRadius: 14,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itineraryDateBox: {
        alignItems: 'center',
        minWidth: 50,
    },
    itineraryMonth: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9ca3af',
        textTransform: 'uppercase',
    },
    itineraryDay: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    itineraryDivider: {
        width: 1,
        height: 32,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 12,
    },
    itineraryTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
    },
    itinerarySubtitle: {
        fontSize: 11,
        color: '#6b7280',
        marginTop: 2,
    },
});
