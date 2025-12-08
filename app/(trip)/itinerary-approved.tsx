// ItineraryApprovedScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ItineraryApprovedScreen() {
    return (
        <View style={styles4.container}>
            <StatusBar barStyle="dark-content" />

            {/* Confetti simples (estático) */}
            <View pointerEvents="none">
                <View style={[styles4.confetti, { left: '10%' }]} />
                <View style={[styles4.confetti, { left: '25%', backgroundColor: '#FFD93D' }]} />
                <View style={[styles4.confetti, { left: '40%', backgroundColor: '#6BCB77' }]} />
                <View style={[styles4.confetti, { left: '60%', backgroundColor: '#4D96FF' }]} />
                <View style={[styles4.confetti, { left: '75%', backgroundColor: '#FF6B6B' }]} />
                <View style={[styles4.confetti, { left: '88%', backgroundColor: '#FFD93D' }]} />
            </View>

            {/* Check icon */}
            <View style={styles4.checkWrapper}>
                <View style={styles4.checkOuter}>
                    <View style={styles4.checkInner}>
                        <Ionicons name="checkmark" size={34} color="#ffffff" />
                    </View>
                </View>
                <Ionicons
                    name="star"
                    size={22}
                    color="#FACC15"
                    style={styles4.sparkleTop}
                />
                <Ionicons
                    name="star"
                    size={16}
                    color="#FACC15"
                    style={styles4.sparkleBottom}
                />
            </View>

            <Text style={styles4.title}>Itinerary Approved!</Text>
            <Text style={styles4.subtitle}>
                Your adventure is ready. Pack your bags and get ready for an unforgettable
                journey.
            </Text>

            {/* Destination card */}
            <View style={styles4.card}>
                <View style={styles4.cardImageWrapper}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                        }}
                        style={styles4.cardImage}
                    />
                    <View style={styles4.cardImageOverlay} />
                    <View style={styles4.cardImageText}>
                        <Text style={styles4.cardImageLabel}>Destination</Text>
                        <Text style={styles4.cardImageTitle}>Kyoto, Japan</Text>
                    </View>
                </View>

                <View style={styles4.cardBody}>
                    <View style={styles4.cardRow}>
                        <View style={styles4.cardInfo}>
                            <View style={styles4.cardIconCircle}>
                                <Ionicons
                                    name="calendar-outline"
                                    size={18}
                                    color="#FF6B6B"
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles4.cardInfoLabel}>Dates</Text>
                                <Text style={styles4.cardInfoValue}>
                                    Oct 15 - Oct 22
                                </Text>
                            </View>
                        </View>
                        <View style={styles4.cardInfo}>
                            <View style={styles4.cardIconCircle}>
                                <Ionicons
                                    name="people-outline"
                                    size={18}
                                    color="#FF6B6B"
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles4.cardInfoLabel}>Travelers</Text>
                                <Text style={styles4.cardInfoValue}>2 Adults</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles4.cardDivider} />

                    <View style={styles4.timelineRow}>
                        <View style={styles4.timelineStatus}>
                            <Text style={styles4.timelineStatusText}>Confirmed</Text>
                        </View>
                        <Text style={styles4.timelineDot}>•</Text>
                        <Text style={styles4.timelineText}>Flight JL402</Text>
                        <Text style={styles4.timelineDot}>•</Text>
                        <Text style={styles4.timelineText}>Ryokan Stay</Text>
                    </View>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles4.buttonsWrapper}>
                <TouchableOpacity style={styles4.primaryButton}>
                    <Text style={styles4.primaryButtonText}>View Final Schedule</Text>
                    <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#ffffff"
                        style={{ marginLeft: 6 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles4.secondaryButton}>
                    <Ionicons
                        name="document-text-outline"
                        size={16}
                        color="#FF6B6B"
                        style={{ marginRight: 6 }}
                    />
                    <Text style={styles4.secondaryButtonText}>Export to PDF</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles4 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    confetti: {
        position: 'absolute',
        top: 10,
        width: 10,
        height: 16,
        borderRadius: 3,
        backgroundColor: '#FF6B6B',
    },
    checkWrapper: {
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkOuter: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'rgba(255,107,107,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkInner: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 8,
    },
    sparkleTop: {
        position: 'absolute',
        top: -6,
        right: -4,
    },
    sparkleBottom: {
        position: 'absolute',
        bottom: 0,
        left: -6,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 20,
        maxWidth: 260,
        lineHeight: 20,
    },

    card: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#ffffff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
        shadowColor: '#9ca3af',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 20,
    },
    cardImageWrapper: {
        height: 150,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardImageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cardImageText: {
        position: 'absolute',
        left: 16,
        bottom: 8,
    },
    cardImageLabel: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: 'rgba(249,250,251,0.9)',
    },
    cardImageTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
    },
    cardBody: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardInfoLabel: {
        fontSize: 11,
        color: '#9ca3af',
        fontWeight: '500',
    },
    cardInfoValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
        marginTop: 1,
    },
    cardDivider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 8,
    },
    timelineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        rowGap: 2,
    },
    timelineStatus: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: '#dcfce7',
    },
    timelineStatusText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#16a34a',
    },
    timelineDot: {
        marginHorizontal: 4,
        fontSize: 12,
        color: '#9ca3af',
    },
    timelineText: {
        fontSize: 11,
        color: '#6b7280',
    },

    buttonsWrapper: {
        width: '100%',
        maxWidth: 360,
        rowGap: 8,
    },
    primaryButton: {
        borderRadius: 14,
        backgroundColor: '#FF6B6B',
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 10,
    },
    primaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ffffff',
    },
    secondaryButton: {
        borderRadius: 14,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B6B',
    },
});
