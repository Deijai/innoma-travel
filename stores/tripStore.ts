// stores/tripStore.ts
import type { Trip } from '@/services/tripService';
import { getTripById, getTripsByStatus, getUserTrips } from '@/services/tripService';
import { create } from 'zustand';

type TripStore = {
    trips: Trip[];
    upcomingTrips: Trip[];
    pastTrips: Trip[];
    currentTrip: Trip | null; // Trip atualmente sendo visualizada
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchTrips: () => Promise<void>;
    fetchUpcomingTrips: () => Promise<void>;
    fetchPastTrips: () => Promise<void>;
    fetchTripById: (tripId: string) => Promise<void>;
    clearTrips: () => void;
    setError: (error: string | null) => void;
    setCurrentTrip: (trip: Trip | null) => void;
};

export const useTripStore = create<TripStore>((set) => ({
    trips: [],
    upcomingTrips: [],
    pastTrips: [],
    currentTrip: null,
    isLoading: false,
    error: null,

    fetchTrips: async () => {
        set({ isLoading: true, error: null });
        try {
            const trips = await getUserTrips();
            set({ trips, isLoading: false });
        } catch (error: any) {
            set({
                error: error?.message ?? 'Erro ao carregar viagens',
                isLoading: false,
            });
        }
    },

    fetchUpcomingTrips: async () => {
        console.log('🚀 Store: Buscando upcoming trips...');
        set({ isLoading: true, error: null });
        try {
            const trips = await getTripsByStatus('upcoming');
            console.log('✅ Store: Upcoming trips carregadas:', trips.length);
            set({ upcomingTrips: trips, isLoading: false });
        } catch (error: any) {
            console.error('❌ Store: Erro ao carregar upcoming trips:', error);
            set({
                error: error?.message ?? 'Erro ao carregar viagens',
                isLoading: false,
            });
        }
    },

    fetchPastTrips: async () => {
        console.log('🚀 Store: Buscando past trips...');
        set({ isLoading: true, error: null });
        try {
            const trips = await getTripsByStatus('past');
            console.log('✅ Store: Past trips carregadas:', trips.length);
            set({ pastTrips: trips, isLoading: false });
        } catch (error: any) {
            console.error('❌ Store: Erro ao carregar past trips:', error);
            set({
                error: error?.message ?? 'Erro ao carregar viagens',
                isLoading: false,
            });
        }
    },

    fetchTripById: async (tripId: string) => {
        console.log('🚀 Store: Buscando trip por ID:', tripId);
        set({ isLoading: true, error: null, currentTrip: null });
        try {
            const trip = await getTripById(tripId);
            if (trip) {
                console.log('✅ Store: Trip carregada:', trip.destination);
                set({ currentTrip: trip, isLoading: false });
            } else {
                set({
                    error: 'Viagem não encontrada',
                    isLoading: false,
                });
            }
        } catch (error: any) {
            console.error('❌ Store: Erro ao carregar trip:', error);
            set({
                error: error?.message ?? 'Erro ao carregar viagem',
                isLoading: false,
            });
        }
    },

    clearTrips: () => {
        set({
            trips: [],
            upcomingTrips: [],
            pastTrips: [],
            currentTrip: null,
            error: null,
        });
    },

    setError: (error: string | null) => {
        set({ error });
    },
    setCurrentTrip: (trip) => set({ currentTrip: trip }),

}));