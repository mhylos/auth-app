
export interface FlightOffersDetailed {
    data: Data;
    dictionaries: Dictionaries;
}

export interface Data {
    id: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: Price;
    travelerPricings: TravelerPricing[];
}

export interface Itinerary {
    duration: string;
    segments: Segment[];
}

export interface Segment {
    departure: Arrival;
    arrival: Arrival;
    carrierCode: string;
    number: string;
    aircraft: SegmentAircraft;
    operating: Operating;
    duration: string;
    id: string;
}

export interface SegmentAircraft {
    code: string;
}

export interface Arrival {
    iataCode: string;
    terminal?: string;
    at: Date;
}

export interface Operating {
    carrierCode: string;
}

export interface Price {
    currency: string;
    total: string;
    base: string;
}

export interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: Price;
    fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    brandedFare: string;
    brandedFareLabel: string;
    class: string;
    includedCheckedBags: IncludedCheckedBags;
    amenities: Amenity[];
}

export interface IncludedCheckedBags {
    quantity: number;
}

export interface Dictionaries {
    aircraft: DictionariesAircraft;
    currencies: Currencies;
    carriers: Carriers;
    locations: Locations;
}

export interface DictionariesAircraft {
    [key: string]: string;
}

export interface Carriers {
    AT: string;
}

export interface Currencies {
    USD: string;
}

export interface Locations {
    [key: string]: Location;
}

export interface Location {
    cityCode: string;
    countryCode: string;
    name?: string;
    id?: string;
    iataCode?: string;
    address?: Address;
}

export interface Address {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    regionCode: string;
    stateCode?: string;
}

export interface Amenity {
    description: string;
    isChargeable: boolean;
    amenityType: string;
    amenityProvider: AmenityProvider;
}

export interface AmenityProvider {
    name: string;
}

export interface IncludedCheckedBags {
    quantity: number;
}