'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchCityInput from '../ui/components/SearchCityInput';
import TripCard from '../ui/components/TripCard';
import { FlightOffersResume } from '@/utils/types/flightsummary';
import MoonLoader from 'react-spinners/MoonLoader';
import useLazyAxios from '@/hooks/useLazyAxios';
import { useTripStore } from '@/store/trip';

export default function Page() {
    const [data, setData] = useState<FlightOffersResume>();
    const [showResults, setShowResults] = useState<boolean>(false);
    const [travelers, setTravelers] = useState<number>(1);
    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const returnDateRef = useRef<HTMLInputElement>(null);
    const [search, { isLoading }] = useLazyAxios<FlightOffersResume>();
    const { setTrip } = useTripStore(({ setTrip }) => ({
        setTrip,
    }));

    useEffect(() => {
        if (localStorage.getItem('name')) {
            nameRef.current!.textContent = localStorage.getItem('name') ?? '';
            nameRef.current!.classList.remove('opacity-0');
        }
    }, []);

    const handleTravelersBtn = (type: 'up' | 'down') => {
        switch (type) {
            case 'up':
                if (travelers < 6) {
                    setTravelers(travelers + 1);
                }
                break;
            case 'down':
                if (travelers > 1) {
                    setTravelers(travelers - 1);
                }
                break;
        }
    };

    const handleTravelerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) return setTravelers(0);

        if (value > 6) {
            setTravelers(6);
        } else if (value < 0) {
            setTravelers(0);
        } else {
            setTravelers(value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fromIata = (document.getElementById('from') as HTMLInputElement)
            .dataset.iataCode;
        const toIata = (document.getElementById('to') as HTMLInputElement).dataset
            .iataCode;
        const departureDate = formData.get('departureDate');
        const returnDate = formData.get('returnDate');
        const travelers = formData.get('travelers');

        if (!fromIata || !toIata || !departureDate || !travelers)
            return alert('Please fill all the fields');
        const formatedDepartureDate = new Date(departureDate as string)
            .toJSON()
            .slice(0, 10);
        const formatedReturnDate = returnDate
            ? new Date(returnDate as string).toJSON().slice(0, 10)
            : undefined;

        let query = `?originLocationCode=${fromIata}&destinationLocationCode=${toIata}&departureDate=${formatedDepartureDate}&adults=${travelers}`;

        query += formatedReturnDate ? `&returnDate=${formatedReturnDate}` : '';

        search({
            url: `/tickets/flight-offers${query}`,
            method: 'get',
        })
            .then(({ data }) => {
                setData(data);
                console.log(
                    fromIata,
                    toIata,
                    formatedDepartureDate,
                    formatedReturnDate,
                    travelers,
                );
                setTrip({
                    origin: fromIata,
                    destination: toIata,
                    departureDate: formatedDepartureDate,
                    returnDate: formatedReturnDate,
                    adults: +travelers,
                });
            })
            .catch(_ => {
                setData({ data: [] });
            });
    };

    return (
        <main className='h-0 w-11/12 xl:w-10/12 2xl:w-8/12 flex flex-1 flex-col items-center mx-auto gap-5 pb-5'>
            <AnimatePresence mode={'popLayout'}>
                {!data && (
                    <motion.div
                        className='flex gap-2 flex-col items-center p-24 bg-white'
                        layout
                        key={'greetings'}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <h1 className='text-3xl font-bold text-center text-blue-600'>
                            Welcome
                        </h1>
                        <span
                            className='text-3xl opacity-0 transition-[opacity]'
                            ref={nameRef}
                        >
                            Name
                        </span>
                        <span className='text-center'>Where are we traveling</span>
                    </motion.div>
                )}
                <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ width: '100%' }}
                    className='w-full h-32 bg-white drop-shadow-xl rounded-lg py-7 px-5 z-10'
                    onLayoutAnimationComplete={() => {
                        setShowResults(true);
                    }}
                >
                    <form
                        action=''
                        className='flex h-full'
                        onSubmit={handleSubmit}
                    >
                        <div className='flex gap-4 h-full items-center w-10/12'>
                            <SearchCityInput
                                label='From'
                                id='from'
                            />
                            <SearchCityInput
                                label='To'
                                id='to'
                            />
                            <fieldset className='flex flex-col h-full'>
                                <label htmlFor='departureDate'>
                                    <span>Date</span>
                                </label>
                                <input
                                    name='departureDate'
                                    id='departureDate'
                                    type='date'
                                    onChange={e => {
                                        if (returnDateRef.current) {
                                            returnDateRef.current.min = e.currentTarget.value;
                                            if (
                                                returnDateRef.current.value &&
                                                returnDateRef.current.value < e.currentTarget.value
                                            ) {
                                                returnDateRef.current.value = e.currentTarget.value;
                                            }
                                        }
                                    }}
                                    min={new Date().toJSON().slice(0, 10)}
                                    className='rounded outline-blue-500 border-2 px-2 h-full'
                                    required
                                />
                            </fieldset>
                            <fieldset className='flex flex-col h-full'>
                                <label htmlFor='returnDate'>
                                    <span>Return Date</span>
                                </label>
                                <input
                                    name='returnDate'
                                    id='returnDate'
                                    type='date'
                                    ref={returnDateRef}
                                    className='rounded outline-blue-500 border-2 px-2 h-full'
                                />
                            </fieldset>
                            <fieldset className='flex flex-col h-full'>
                                <label htmlFor='travelers'>Travelers</label>
                                <div className='relative flex items-center max-w-[8rem]'>
                                    <button
                                        type='button'
                                        id='decrement-button'
                                        onClick={() => handleTravelersBtn('down')}
                                        className='bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                                    >
                                        <svg
                                            className='w-3 h-3 text-gray-900'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 18 2'
                                        >
                                            <path
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M1 1h16'
                                            />
                                        </svg>
                                    </button>
                                    <input
                                        type='text'
                                        id='travelers'
                                        name='travelers'
                                        onChange={handleTravelerInput}
                                        onBlur={e =>
                                            e.currentTarget.value === '0' ? setTravelers(1) : ''
                                        }
                                        className='bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5'
                                        value={travelers}
                                        required
                                    />
                                    <button
                                        type='button'
                                        id='increment-button'
                                        onClick={() => handleTravelersBtn('up')}
                                        className='bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                                    >
                                        <svg
                                            className='w-3 h-3 text-gray-900'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 18 18'
                                        >
                                            <path
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M9 1v16M1 9h16'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='bg-blue-600 text-white disabled:bg-transparent transition-colors text-2xl rounded h-full ml-auto aspect-square grid place-items-center'
                        >
                            {isLoading ? <MoonLoader size={25} /> : <FaSearch />}
                        </button>
                    </form>
                </motion.div>
                {showResults && data && (
                    <motion.div
                        layout
                        key={'results'}
                        initial={{ maxHeight: 0 }}
                        animate={{ maxHeight: '100%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='w-full max-h-full bg-white drop-shadow-xl rounded-lg py-7 px-5 flex-1 z-0 overflow-y-auto'
                    >
                        <div className='grid grid-cols-2 gap-2'>
                            {/* {TRIPS.map((trip, index) => (
                                <TripCard trip={trip} key={index} />
                            ))} */}
                            {data.data.length > 0 ? (
                                data?.data.map((trip, index) => (
                                    <TripCard
                                        trip={trip}
                                        dictionaries={data.dictionaries}
                                        key={index}
                                    />
                                ))
                            ) : (
                                <div className='col-span-2 flex flex-col items-center justify-center'>
                                    <h1 className='text-3xl font-bold text-gray-900'>
                                        No results
                                    </h1>
                                    <span className='text-gray-700'>
                                        Try again with different information
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
