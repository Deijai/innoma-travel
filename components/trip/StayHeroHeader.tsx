// components/trip/StayHeroHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    imageUrl: string;
    priceMain: string;
    priceSub: string;
    onBack?: () => void;
    onPressLike?: () => void;
    onPressShare?: () => void;
};

export function StayHeroHeader({
    imageUrl,
    priceMain,
    priceSub,
    onBack,
    onPressLike,
    onPressShare,
}: Props) {
    return (
        <View style={styles.hero}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.heroImage}
            />
            <View style={styles.heroOverlay} />

            {/* Top Nav */}
            <View style={styles.heroTopBar}>
                <TouchableOpacity
                    style={styles.heroIconButton}
                    activeOpacity={0.8}
                    onPress={onBack}
                >
                    <Ionicons name="arrow-back" size={18} color="#fff" />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', columnGap: 10 }}>
                    <TouchableOpacity
                        style={styles.heroIconButton}
                        activeOpacity={0.8}
                        onPress={onPressLike}
                    >
                        <Ionicons name="heart-outline" size={18} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.heroIconButton}
                        activeOpacity={0.8}
                        onPress={onPressShare}
                    >
                        <Ionicons name="share-social-outline" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Price */}
            <View style={styles.priceBadge}>
                <Text style={styles.priceMain}>{priceMain}</Text>
                <Text style={styles.priceSub}>{priceSub}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: {
        height: 280,
        width: '100%',
    },
    heroImage: { width: '100%', height: '100%' },
    heroOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    heroTopBar: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    heroIconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceBadge: {
        position: 'absolute',
        right: 24,
        bottom: 32,
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'flex-end',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    priceMain: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FF6B6B',
        marginRight: 4,
    },
    priceSub: {
        fontSize: 11,
        color: '#6b7280',
        fontWeight: '500',
    },
});
