import { FlightOffers } from "@/utils/types";
import Link from "next/link";
import router from "next/router";

export default function TripCard({ trip }: { trip: FlightOffers }) {
    return (
        <div className={`grid grid-cols-3 grid-rows-2 h-44 gap-y-3 gap-x-2 p-4 bg-white rounded-lg shadow-lg border-2 transition-colors border-solid hover:border-blue-400`}>
            <div className="flex flex-col">
                <span className="text-xs">Origin</span>
                <div className="text-2xl font-bold text-gray-800 flex flex-col">
                    {trip.itineraries[0].segments[0].departure.iataCode}
                    <span className="text-xs line-clamp-2">Santiago de Chile</span>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xs">Destination</span>
                <div className="text-2xl font-bold text-gray-800 flex flex-col">
                    {trip.itineraries[0].segments[0].arrival.iataCode}
                    <span className="text-xs line-clamp-2">Peru</span>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xs">Price</span>
                <div className="text-2xl font-bold text-gray-800">
                    {trip.price.grandTotal}
                </div>
                <div className="text-sm text-gray-600">
                    {trip.price.currency}
                </div>
            </div>
            <div>
                <span className="text-xs">Departure at</span>
                <div className="text-sm text-gray-600">
                    {trip.itineraries[0].segments[0].departure.at.toLocaleDateString() + ' ' + trip.itineraries[0].segments[0].departure.at.toLocaleTimeString()}
                </div>
            </div>
            <div>
                <span className="text-xs">Arriving at</span>
                <div className="text-sm text-gray-600">
                    {trip.itineraries[0].segments[0].departure.at.toLocaleDateString() + ' ' + trip.itineraries[0].segments[0].departure.at.toLocaleTimeString()}
                </div>
            </div>
            <Link className="btn bg-blue-600 rounded text-white" href={'/trips/1'}>Buy</Link>
        </div>
    );
}