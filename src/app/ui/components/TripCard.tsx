import { Datum, Dictionaries } from '@/utils/types/flightsummary';
import Link from 'next/link';
import { Fragment } from 'react';

interface TripCardProps {
    trip: Datum;
    dictionaries: Dictionaries | undefined;
}

export default function TripCard({ trip, dictionaries }: TripCardProps) {
    return (
        <div className='flex gap-y-3 gap-x-2 p-4 bg-white rounded-lg shadow-lg border-2 transition-colors border-solid hover:border-blue-400 justify-between'>
            <div
                className={`grid grid-cols-2 auto-rows-max flex-1`}
            >
                {trip.itineraries.map(({ duration, segments }, index) => {
                    const departuteDate = new Date(
                        segments[0].departure.at,
                    );
                    const arrivalDate = new Date(
                        segments[0].arrival.at,
                    );
                    return (
                        <Fragment key={`${duration}- ${segments[0].departure.iataCode}-${segments[0].arrival.iataCode}`}>

                            {/* <h3 className='col-span-2 '>{index === 0 ? 'Outbound' : 'Return'}</h3> */}
                            {
                                index === 0 ? <h3 className='col-span-2'>Outbound</h3> : <h3 className='col-span-2 mt-2'>Return</h3>
                            }
                            <div className='flex flex-col'>
                                <span className='text-xs'>Origin</span>
                                <div className='text-2xl font-bold text-gray-800 flex flex-col'>
                                    {segments[0].departure.iataCode}
                                    <span className='text-xs line-clamp-2'>
                                        {
                                            dictionaries?.locations[
                                                segments[0].departure.iataCode
                                            ].name
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs'>Destination</span>
                                <div className='text-2xl font-bold text-gray-800 flex flex-col'>
                                    {segments[0].arrival.iataCode}
                                    <span className='text-xs line-clamp-2'>
                                        {
                                            dictionaries?.locations[
                                                segments[0].arrival.iataCode
                                            ].name
                                        }
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className='text-xs'>Departure at</span>
                                <div className='text-sm text-gray-600'>
                                    {departuteDate.toLocaleDateString() +
                                        ' ' +
                                        departuteDate.toLocaleTimeString()}
                                </div>
                            </div>
                            <div>
                                <span className='text-xs'>Arriving at</span>
                                <div className='text-sm text-gray-600'>
                                    {arrivalDate.toLocaleDateString() +
                                        ' ' +
                                        arrivalDate.toLocaleTimeString()}
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
            <div className='flex flex-col w-32 justify-end gap-5'>
                <div className='flex flex-col items-end'>
                    <span className='text-xs'>Price</span>
                    <div className='text-2xl font-bold text-gray-800'>
                        {trip.price.total}
                    </div>
                    <div className='text-sm text-gray-600'>{trip.price.currency}</div>
                </div>
                <Link
                    className='btn bg-blue-600 rounded text-white'
                    href={`/trips/buy?id=${trip.id}`}
                >
                    Buy
                </Link>
            </div>
        </div>
    );
}
