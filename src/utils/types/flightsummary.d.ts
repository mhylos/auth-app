export interface FlightOffersResume {
    data: Datum[];
    dictionaries?: Dictionaries;
}

export interface Datum {
    id: string;
    itineraries: Itinerary[];
    price: Price;
}

export interface Itinerary {
    duration: Duration;
    segments: Segment[];
}

export type Duration = `PT${number}H${number}M`;

export interface Segment {
    departure: Arrival;
    arrival: Arrival;
}

export interface Arrival {
    iataCode: Code;
    terminal: string;
    at: Date;
    carrierCode: CarrierCode;
}

export type CarrierCode = string;

export type Code = string;

export interface Price {
    currency: Currency;
    total: string;
}

export type Currency = 'USD';

export interface Dictionaries {
    currencies: Currencies;
    carriers: Carriers;
    locations: Locations;
}

export interface Carriers {
    IB: string;
}

export interface Currencies {
    USD: string;
}

export interface Locations {
    [key: string]: Location;
}

export interface Location {
    cityCode: Code;
    countryCode: string;
    name?: string;
    id?: string;
    iataCode?: Code;
    address?: Address;
}

export interface Address {
    cityName: string;
    countryName: string;
}
