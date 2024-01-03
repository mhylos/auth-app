import { create } from 'zustand';

interface TripState {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
}

interface TripStateActions {
    setTrip: (newTrip: TripState) => void;
}
export const useTripStore = create<TripState & TripStateActions>(set => ({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: undefined,
    adults: 0,
    setTrip: set,
}));
