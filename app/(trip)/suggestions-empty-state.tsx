// SuggestionsEmptyStateScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SuggestionsEmptyStateScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <View style={styles.headerWrapper}>
                {/* Top bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="arrow-back" size={18} color="#4b5563" />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.tripTitle}>Bali Summer Trip 🌴</Text>
                        <Text style={styles.tripSubtitle}>
                            Aug 12 - Aug 20 • 5 Days left
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="settings-outline" size={18} color="#4b5563" />
                    </TouchableOpacity>
                </View>

                {/* Avatars */}
                <View style={styles.avatarsRow}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=1' }}
                        style={styles.avatar}
                    />
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
                        style={styles.avatar}
                    />
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
                        style={styles.avatar}
                    />
                    <View style={styles.moreAvatar}>
                        <Text style={styles.moreAvatarText}>+2</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsRow}>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabTextInactive}>Itinerary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItemActive}>
                        <Text style={styles.tabTextActive}>Suggestions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabTextInactive}>Budget</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* MAIN CONTENT */}
            <ScrollView
                contentContainerStyle={styles.mainContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Ilustração simplificada */}
                <View style={styles.illustrationWrapper}>
                    <View style={styles.blob} />
                    <View style={styles.mapCard}>
                        <View style={styles.mapPaper}>
                            <View style={[styles.mapFold, { left: '33%' }]} />
                            <View style={[styles.mapFold, { left: '66%' }]} />
                            <View style={styles.mapPath} />
                        </View>

                        {/* Person circle */}
                        <View style={styles.personHead} />
                        <View style={styles.personBody} />

                        {/* “Bússola” */}
                        <View style={styles.compassWrapper}>
                            <View style={styles.compassOuter}>
                                <View style={styles.compassInner} />
                                <View style={styles.compassNeedle} />
                            </View>
                        </View>

                        {/* ? marks */}
                        <Text style={styles.questionMarkLeft}>?</Text>
                        <Text style={styles.questionMarkRight}>?</Text>
                    </View>
                </View>

                <Text style={styles.emptyTitle}>The map is blank!</Text>
                <Text style={styles.emptySubtitle}>
                    No plans yet? Be the hero of this trip and be the first to suggest a spot.
                </Text>

                {/* “Start here” arrow fake */}
                <View style={styles.arrowHintWrapper}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={20}
                        color="#FF6B6B"
                        style={{ transform: [{ rotate: '-110deg' }] }}
                    />
                    <Text style={styles.arrowHintText}>Start here!</Text>
                </View>
            </ScrollView>

            {/* FAB */}
            <View style={styles.fabWrapper}>
                <TouchableOpacity style={styles.fab}>
                    <Ionicons name="add" size={26} color="#ffffff" />
                </TouchableOpacity>
            </View>

            {/* Bottom nav */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Ionicons name="compass-outline" size={20} color="#9ca3af" />
                    <Text style={styles.bottomNavLabel}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItemActive}>
                    <Ionicons name="briefcase-outline" size={20} color="#FF6B6B" />
                    <Text style={styles.bottomNavLabelActive}>Trips</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color="#9ca3af" />
                    <Text style={styles.bottomNavLabel}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <Text style={styles.bottomNavLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },

    headerWrapper: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    tripSubtitle: {
        fontSize: 11,
        color: '#6b7280',
        fontWeight: '500',
        marginTop: 2,
    },
    avatarsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        marginLeft: -6,
    },
    moreAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        borderWidth: 2,
        borderColor: '#ffffff',
        marginLeft: -6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreAvatarText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6b7280',
    },

    tabsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabItemActive: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#FF6B6B',
    },
    tabTextInactive: {
        fontSize: 13,
        fontWeight: '500',
        color: '#9ca3af',
    },
    tabTextActive: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FF6B6B',
    },

    mainContent: {
        paddingTop: 20,
        paddingHorizontal: 24,
        paddingBottom: 120,
        alignItems: 'center',
    },

    illustrationWrapper: {
        width: 220,
        height: 220,
        marginBottom: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blob: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#FFF1F1',
    },
    mapCard: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapPaper: {
        width: 120,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        borderWidth: 3,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    mapFold: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#f3f4f6',
    },
    mapPath: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
        height: 2,
        borderRadius: 2,
        backgroundColor: '#e5e7eb',
    },
    personHead: {
        position: 'absolute',
        top: 52,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FF6B6B',
    },
    personBody: {
        position: 'absolute',
        top: 90,
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#374151',
    },
    compassWrapper: {
        position: 'absolute',
        right: 16,
        bottom: 40,
    },
    compassOuter: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#374151',
        alignItems: 'center',
        justifyContent: 'center',
    },
    compassInner: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E0F2FE',
    },
    compassNeedle: {
        position: 'absolute',
        width: 4,
        height: 18,
        borderRadius: 2,
        backgroundColor: '#FF6B6B',
        transform: [{ rotate: '20deg' }],
    },
    questionMarkLeft: {
        position: 'absolute',
        left: 16,
        top: 30,
        fontSize: 24,
        fontWeight: '700',
        color: '#FF6B6B',
    },
    questionMarkRight: {
        position: 'absolute',
        right: 30,
        top: 40,
        fontSize: 18,
        fontWeight: '700',
        color: '#FF6B6B',
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 260,
    },

    arrowHintWrapper: {
        position: 'absolute',
        right: 70,
        bottom: 80,
        alignItems: 'center',
        transform: [{ rotate: '-10deg' }],
    },
    arrowHintText: {
        fontSize: 11,
        color: '#FF6B6B',
        marginTop: 4,
        fontStyle: 'italic',
    },

    fabWrapper: {
        position: 'absolute',
        right: 20,
        bottom: 80,
    },
    fab: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },

    bottomNav: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 24,
        paddingBottom: 10,
        paddingTop: 8,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomNavItem: {
        alignItems: 'center',
    },
    bottomNavItemActive: {
        alignItems: 'center',
    },
    bottomNavLabel: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
        fontWeight: '500',
    },
    bottomNavLabelActive: {
        fontSize: 10,
        color: '#FF6B6B',
        marginTop: 2,
        fontWeight: '600',
    },
});
