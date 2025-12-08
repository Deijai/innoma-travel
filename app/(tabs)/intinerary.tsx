// app/(tabs)/intinerary.tsx (ajusta o caminho conforme seu router)
import { FabButton } from '@/components/common/FabButton';
import { ItineraryFilters } from '@/components/itinerary/ItineraryFilters';
import { ItineraryHeader } from '@/components/itinerary/ItineraryHeader';
import { SuggestionCard } from '@/components/itinerary/SuggestionCard';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Intinerary() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <ItineraryHeader
                subtitle="Iceland Trip 2024"
                title="Itinerary"
                onOptionsPress={() => { }}
                onNotificationsPress={() => { }}
            />

            {/* FILTER TABS */}
            <ItineraryFilters
                filters={[
                    { id: 'all', label: 'All Suggestions', active: true },
                    { id: 'activities', label: 'Activities' },
                    { id: 'dining', label: 'Dining' },
                    { id: 'lodging', label: 'Lodging' },
                ]}
                onPressFilter={() => {
                    // depois você pluga o estado real aqui
                }}
            />

            {/* FEED */}
            <ScrollView
                style={styles.feed}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* CARD 1 – High votes */}
                <SuggestionCard
                    imageUrl="https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tagIcon="water-outline"
                    tagIconColor="#3b82f6"
                    tagLabel="Relaxation"
                    tagRightLabel="$120 / person"
                    title="Blue Lagoon Spa Day"
                    description="Famous geothermal spa. Includes mud mask, towel, and first drink of your choice."
                    rating={4.8}
                    voteYes={4}
                    voteTotal={5}
                    voteAvatars={[
                        'https://i.pravatar.cc/150?img=32',
                        'https://i.pravatar.cc/150?img=12',
                        'https://i.pravatar.cc/150?img=5',
                    ]}
                    voteMoreLabel="+1"
                    voteStyle="highlight"
                    progressPercent={80}
                    primaryVariant="solid"
                    primaryLabel="Vote Up"
                    secondaryLabel="Discuss"
                    onPrimaryPress={() => { }}
                    onSecondaryPress={() => { }}
                />

                {/* CARD 2 – Low votes */}
                <SuggestionCard
                    imageUrl="https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tagIcon="walk"
                    tagIconColor="#16a34a"
                    tagLabel="Adventure"
                    tagRightLabel="$85 / person"
                    title="Sólheimajökull Glacier Hike"
                    description="3-hour guided hike on the glacier tongue. Crampons and axes provided."
                    voteYes={1}
                    voteTotal={5}
                    voteAvatars={[
                        'https://i.pravatar.cc/150?img=60',
                    ]}
                    voteStyle="muted"
                    progressPercent={20}
                    primaryVariant="outline"
                    primaryLabel="Vote Up"
                    secondaryLabel="Discuss"
                    onPrimaryPress={() => { }}
                    onSecondaryPress={() => { }}
                />

                {/* CARD 3 – Dining */}
                <SuggestionCard
                    imageUrl="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tagIcon="restaurant"
                    tagIconColor="#f97316"
                    tagLabel="Dining"
                    tagRightLabel="$$$"
                    title="Dill Restaurant"
                    description="New Nordic cuisine. Tasting menu focusing on local ingredients."
                    voteYes={3}
                    voteTotal={5}
                    voteAvatars={[
                        'https://i.pravatar.cc/150?img=32',
                        'https://i.pravatar.cc/150?img=12',
                        'https://i.pravatar.cc/150?img=5',
                    ]}
                    voteStyle="highlight"
                    progressPercent={60}
                    primaryVariant="solid"
                    primaryLabel="Vote Up"
                    secondaryLabel="Discuss"
                    onPrimaryPress={() => { }}
                    onSecondaryPress={() => { }}
                />
            </ScrollView>

            {/* FAB – botão flutuante */}
            <FabButton
                iconName="add"
                style={{ right: 20 }} // 👈 mantém exatamente o layout original
                onPress={() => {
                    // ex: abrir modal para adicionar sugestão
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    feed: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
