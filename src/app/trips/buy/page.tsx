'use client';

import PayButton from '@/app/ui/components/PayButton';
import { useTripStore } from '@/store/trip';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowRight, FaPlaneUp, FaCartShopping } from 'react-icons/fa6';
import { BsFillSuitcase2Fill } from 'react-icons/bs';
import Image from 'next/image';
import { useAxios } from '@/hooks';

import { Carriers, FlightOffersDetailed } from '@/utils/types/flightdetailed';
import BillingInfoForm from '@/app/ui/components/BillingInfoForm';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { BillingInfo } from '@/utils/types/types';

export default function Page() {
    const form = useRef<HTMLFormElement>(null);
    const [billingInfo, setBillingInfo] = useState<BillingInfo>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });
    const { origin, destination, departureDate, returnDate, adults } =
        useTripStore(({ setTrip, ...trip }) => ({
            ...trip,
        }));
    const router = useRouter();

    const id = useSearchParams().get('id');

    const { data, isLoading, hasError } =
        useAxios<FlightOffersDetailed>({
            url: `/tickets/flight-offer/${id}?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}${returnDate ? `&returnDate=${returnDate}` : ''
                }`,
            method: 'get',
        });

    useEffect(() => {
        if (localStorage.getItem('name') && form.current) {
            const nameInputValue = document.getElementById(
                'name',
            ) as HTMLInputElement;
            const name = localStorage.getItem('name');
            nameInputValue.value = name ? name : '';
        }
    }, [form]);

    useEffect(() => {
        if (hasError) {
            router.replace('/trips');
        }
    }, [hasError]);


    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    if (isLoading || hasError) {
        return (
            <main className='absolute grid w-screen h-screen place-items-center bg-white'>
                <Image
                    src='/loading-animation.gif'
                    alt='loading-animation'
                    width={600}
                    height={600}
                />
            </main>
        );
    }

    console.log(billingInfo);


    return (
        <>
            <main className='h-full w-11/12 xl:w-10/12 2xl:w-8/12 grid grid-cols-3 mx-auto gap-5 pb-5'>
                <section className='col-span-2 bg-white drop-shadow-xl p-4 rounded-xl text-gray-900'>
                    <h2 className='text-2xl font-bold'>Billing information</h2>
                    <BillingInfoForm setBillingInfo={setBillingInfo} />
                </section>
                <section className='bg-white drop-shadow-xl p-4 rounded-xl text-gray-900 flex flex-col gap-2'>
                    <h2 className='text-2xl font-bold'>Details</h2>
                    <hr className='mb-2' />
                    <div className='border-2 border-solid border-neutral-100 rounded p-1'>
                        <div className='flex gap-2 mb-3 place-items-center'>
                            <div className='rounded-full bg-blue-600 h-8 aspect-square grid place-items-center'>
                                <FaPlaneUp className='text-white' />
                            </div>
                            <div className='flex flex-col'>
                                <h3>Flight information</h3>
                                <span className='text-gray-700 text-[10px]'>{data?.data.price.currency} ${data?.data.price.base}</span>
                            </div>
                        </div>
                        <div className='text-sm flex flex-col'>
                            {data?.data.itineraries.map(({ segments }, index) => {
                                const departureDate = new Date(
                                    segments[0].departure.at,
                                );
                                const arrivalDate = new Date(
                                    segments[0].arrival.at,
                                );
                                return (
                                    <Fragment key={`${segments[0].departure.iataCode}-${segments[0].arrival.iataCode}`}>
                                        <span className='text-blue-500'>
                                            From <b>{data?.dictionaries.locations[segments[0].departure.iataCode].address?.cityName}</b> to <b>{data?.dictionaries.locations[segments[0].arrival.iataCode].address?.cityName}</b>
                                        </span>
                                        <span>{departureDate.toLocaleString('en-US', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' })}</span>
                                        <div className='grid grid-cols-[2fr_1fr_2fr] auto-rows-max'>
                                            <span className='text-[12px]'>Departuring</span>
                                            <FaArrowRight className='text-gray-600 row-span-2 self-center place-self-center text-xl' />
                                            <span className='text-[12px] text-end'>Arriving</span>
                                            <span>{origin} {departureDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                            <span className='text-end'>{destination} {arrivalDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                        </div>
                                        <span>Carrier: {data?.dictionaries.carriers[segments[0].carrierCode as keyof Carriers]} </span>
                                        <span >Cabin: {data?.data.travelerPricings[0].fareDetailsBySegment[0].cabin}</span>
                                        <span >Class: {data?.data.travelerPricings[0].fareDetailsBySegment[0].class}</span>
                                        {index === 0 && data?.data.itineraries.length > 1 && <hr className='my-2 border-2 rounded' />}
                                    </Fragment>
                                );
                            })}
                            <span className='mt-5'>{adults} Adults</span>
                        </div>
                    </div>
                    <div className='border-2 border-solid border-neutral-100 rounded p-1'>
                        <div className='flex gap-2 place-items-center'>
                            <div className='rounded-full bg-blue-600 h-8 aspect-square grid place-items-center'>
                                <BsFillSuitcase2Fill className='text-white' />
                            </div>
                            <div className='flex flex-col'>
                                <h3>Amenities</h3>
                                <span className='text-gray-700 text-[10px]'>USD $0</span>
                                {
                                    data?.data.travelerPricings[0].fareDetailsBySegment[0].amenities.map((amenity, index) => {
                                        return (!amenity.isChargeable &&
                                            <span key={index} className='text-gray-700 text-[10px]'>{amenity.description}</span>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-solid border-neutral-100 rounded p-1 mt-auto'>
                        <div className='flex gap-2 place-items-center'>
                            <div className='rounded-full bg-blue-600 h-8 aspect-square grid place-items-center'>
                                <FaCartShopping className='text-white' />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-gray-700 text-sm'>Final Price</h3>
                                <span className='text-gray-700 text-[10px]'>{data?.data.price.currency} ${data?.data.price.base} Tickets</span>
                                <span className='text-gray-700 text-[10px]'>{data?.data.price.currency} ${((+(data?.data.price.total ?? 0)) - (+(data?.data.price.base ?? 0))).toFixed(2)} Commision</span>
                                <span className='text-blue-700 text-lg'>{data?.data.price.currency} ${data?.data.price.total}</span>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-5'}>
                        <PayPalScriptProvider
                            options={{
                                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID ?? '',
                            }}
                        >
                            <PayPalButtons
                                disabled={Object.values(billingInfo).some((value) => value === '')}
                                style={{ layout: "horizontal", label: "pay" }}
                                createOrder={async () => {
                                    const res = await fetch('/api/checkout', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            billingInfo,
                                            flightOffer: data?.data,
                                        }),
                                    });
                                    const order = await res.json();
                                    return order.id;
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </section>
            </main>
        </>
    );
}
