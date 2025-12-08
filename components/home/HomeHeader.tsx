// src/components/home/HomeHeader.tsx
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type HomeHeaderProps = {
    welcomeText: string;
    title: string;
    avatarUrl: string;
};

export function HomeHeader({ welcomeText, title, avatarUrl }: HomeHeaderProps) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.welcomeText}>{welcomeText}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                    <Image
                        source={{ uri: avatarUrl }}
                        style={styles.avatarImage}
                    />
                </View>
                <View style={styles.statusDot} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e7eb',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    welcomeText: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#9ca3af',
        fontWeight: '600',
        marginBottom: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    statusDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FF6B6B',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
});
