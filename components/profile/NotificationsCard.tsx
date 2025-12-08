// src/components/profile/NotificationsCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type NotificationItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconBg: string;
    title: string;
    subtitle: string;
    enabled: boolean;
};

type NotificationsCardProps = {
    title: string;
    items: NotificationItem[];
};

export function NotificationsCard({ title, items }: NotificationsCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>

            {items.map((item, index) => (
                <View
                    key={item.id}
                    style={[
                        styles.toggleRow,
                        index === items.length - 1 && { marginBottom: 0 },
                    ]}
                >
                    <View style={styles.toggleInfo}>
                        <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                            <Ionicons
                                name={item.iconName}
                                size={16}
                                color="#FF6B6B"
                            />
                        </View>
                        <View>
                            <Text style={styles.toggleTitle}>{item.title}</Text>
                            <Text style={styles.toggleSubtitle}>{item.subtitle}</Text>
                        </View>
                    </View>

                    {/* Só simulando o switch ligado, igual ao layout original */}
                    {item.enabled ? (
                        <View style={styles.switchTrackOn}>
                            <View style={styles.switchThumbOn} />
                        </View>
                    ) : (
                        <View style={[styles.switchTrackOn, { opacity: 0.4 }]}>
                            <View
                                style={[
                                    styles.switchThumbOn,
                                    { alignSelf: 'flex-start' },
                                ]}
                            />
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    toggleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        flex: 1,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    toggleSubtitle: {
        fontSize: 11,
        color: '#6b7280',
    },
    switchTrackOn: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF6B6B',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    switchThumbOn: {
        width: 19,
        height: 19,
        borderRadius: 9.5,
        backgroundColor: '#ffffff',
        alignSelf: 'flex-end',
    },
});
