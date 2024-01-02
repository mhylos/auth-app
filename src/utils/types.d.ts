export interface IUseAxios {
	url: string;
	method: 'get' | 'post' | 'put' | 'delete';
	data?: any;
}

export type UserType = {
	id: number;
	name: string;
	email: string;
	token: string;
};

export type MessageResponseType = {
	message: string;
};

export type responseType<R> = {
	data?: R;
	errorMessage: string;
	hasError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	reFetch: [any, DispatchWithoutAction];
};

export interface FlightOffers {
	type: FlightOfferType;
	id: string;
	source: Source;
	instantTicketingRequired: boolean;
	nonHomogeneous: boolean;
	oneWay: boolean;
	lastTicketingDate: Date;
	lastTicketingDateTime: Date;
	numberOfBookableSeats: number;
	itineraries: Itinerary[];
	price: FlightOfferPrice;
	pricingOptions: PricingOptions;
	validatingAirlineCodes: Code[];
	travelerPricings: TravelerPricing[];
}

export interface Itinerary {
	duration: string;
	segments: Segment[];
}

export interface Segment {
	departure: Arrival;
	arrival: Arrival;
	carrierCode: Code;
	number: string;
	aircraft: Aircraft;
	operating?: Operating;
	duration: string;
	id: string;
	numberOfStops: number;
	blacklistedInEU: boolean;
}

export interface Aircraft {
	code: string;
}

export interface Arrival {
	iataCode: string;
	terminal?: string;
	at: Date;
}

export type Code = "AC" | "CM" | "NH" | "DL";

export interface Operating {
	carrierCode: Code;
}

export interface FlightOfferPrice {
	currency: Currency;
	total: string;
	base: string;
	fees: Fee[];
	grandTotal: string;
}

export type Currency = "CLP";

export interface Fee {
	amount: string;
	type: FeeType;
}

export type FeeType = "SUPPLIER" | "TICKETING";

export interface PricingOptions {
	fareType: FareType[];
	includedCheckedBagsOnly: boolean;
}

export type FareType = "PUBLISHED";

export type Source = "GDS";

export interface TravelerPricing {
	travelerId: string;
	fareOption: FareOption;
	travelerType: TravelerType;
	price: TravelerPricingPrice;
	fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
	segmentId: string;
	cabin: Cabin;
	fareBasis: FareBasis;
	brandedFare?: FareOption;
	brandedFareLabel?: BrandedFareLabel;
	class: Class;
	includedCheckedBags: IncludedCheckedBags;
	amenities?: Amenity[];
}

export interface Amenity {
	description: Description;
	isChargeable: boolean;
	amenityType: AmenityType;
	amenityProvider: AmenityProvider;
}

export interface AmenityProvider {
	name: Name;
}

export type Name = "BrandedFare";

export type AmenityType = "BAGGAGE" | "MEAL" | "BRANDED_FARES" | "PRE_RESERVED_SEAT";

export type Description = "CHECKED BAG SECOND" | "COMPLIMENTARY MEAL" | "BASIC SEAT" | "CHANGEABLE TICKET" | "CHECKED BAG FIRST" | "PRE RESERVED SEAT ASSIGNMENT" | "SNACK" | "ALCOHOLIC DRINK" | "UPGRADE ELIGIBILITY" | "CHANGE BEFORE DEPARTURE" | "CHANGE AFTER DEPARTURE" | "REFUND BEFORE DEPARTURE" | "REFUND AFTER DEPARTURE";

export type FareOption = "STANDARD" | "BASIC" | "MAINCABIN" | "PEYFULFLX";

export type BrandedFareLabel = "STANDARD" | "BASIC" | "MAIN CABIN" | "PEY I FULLFLEX";

export type Cabin = "ECONOMY" | "PREMIUM_ECONOMY";

export type Class = "G" | "E" | "H" | "S" | "M" | "V" | "A" | "Y" | "W";

export type FareBasis = "GHVS02TG" | "GLZT82BA" | "GJUR83BA" | "HHE5ISOH" | "HNNA0NMZ" | "MHE8ISOM" | "G1WY";

export interface IncludedCheckedBags {
	quantity: number;
}

export interface TravelerPricingPrice {
	currency: Currency;
	total: string;
	base: string;
}

export type TravelerType = "ADULT";

export type FlightOfferType = "flight-offer";