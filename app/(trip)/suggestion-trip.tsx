// app/(trip)/stay-suggestion.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { StayDetailsContent } from '@/components/trip/StayDetailsContent';
import { StayFooterActions } from '@/components/trip/StayFooterActions';
import { StayHeroHeader } from '@/components/trip/StayHeroHeader';

export default function StaySuggestionScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <StayHeroHeader
                imageUrl="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                priceMain="$120"
                priceSub="/ night"
                onBack={() => router.back()}
                onPressLike={() => {
                    // TODO: favoritar stay
                }}
                onPressShare={() => {
                    // TODO: compartilhar stay
                }}
            />

            <StayDetailsContent />

            <StayFooterActions
                onReject={() => {
                    // TODO: rejeitar sugestão
                }}
                onApprove={() => {
                    // TODO: aprovar sugestão
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
});
