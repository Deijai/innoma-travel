// src/components/profile/LinkedAccountsCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type LinkedAccountStatus = 'synced' | 'disconnected';

type LinkedAccount = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconBg: string;
    iconColor: string;
    title: string;
    status: LinkedAccountStatus;
};

type LinkedAccountsCardProps = {
    title: string;
    accounts: LinkedAccount[];
    onPressConnect?: (id: string) => void;
    onPressMore?: (id: string) => void;
};

export function LinkedAccountsCard({
    title,
    accounts,
    onPressConnect,
    onPressMore,
}: LinkedAccountsCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>

            {accounts.map((acc, index) => {
                const isSynced = acc.status === 'synced';

                return (
                    <View key={acc.id}>
                        <View style={styles.linkRow}>
                            <View style={styles.linkInfo}>
                                <View
                                    style={[
                                        styles.iconCircleLarge,
                                        { backgroundColor: acc.iconBg },
                                    ]}
                                >
                                    <Ionicons
                                        name={acc.iconName}
                                        size={18}
                                        color={acc.iconColor}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.linkTitle}>{acc.title}</Text>
                                    {isSynced ? (
                                        <Text style={styles.linkStatusSynced}>
                                            <Ionicons
                                                name="checkmark-circle"
                                                size={12}
                                                color="#22c55e"
                                            />{' '}
                                            Synced
                                        </Text>
                                    ) : (
                                        <Text style={styles.linkStatus}>
                                            Not connected
                                        </Text>
                                    )}
                                </View>
                            </View>

                            {isSynced ? (
                                <TouchableOpacity
                                    onPress={() => onPressMore?.(acc.id)}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons
                                        name="ellipsis-vertical"
                                        size={16}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.connectBtn}
                                    onPress={() => onPressConnect?.(acc.id)}
                                    activeOpacity={0.85}
                                >
                                    <Text style={styles.connectBtnText}>Connect</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {index < accounts.length - 1 && (
                            <View style={styles.linkSeparator} />
                        )}
                    </View>
                );
            })}
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
    linkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    linkInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
    },
    iconCircleLarge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    linkStatusSynced: {
        fontSize: 11,
        color: '#16a34a',
        marginTop: 2,
    },
    linkStatus: {
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },
    linkSeparator: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginVertical: 8,
    },
    connectBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },
    connectBtnText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#4b5563',
    },
});
