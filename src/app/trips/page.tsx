'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchInput from "../ui/components/SearchInput";
import TripCard from "../ui/components/TripCard";
import { FlightOffers } from "@/utils/types";

const RESULTS = ['ARICA', 'IQUIQUE', 'ANTOFAGASTA', 'COPIAPO', 'LA SERENA'];
const TRIPS: FlightOffers[] = [
    {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": new Date("2024-01-05"),
        "lastTicketingDateTime": new Date("2024-01-05"),
        "numberOfBookableSeats": 9,
        "itineraries": [
            {
                "duration": "PT41H55M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SCL",
                            "terminal": "2",
                            "at": new Date("2024-08-01T08:00:00")
                        },
                        "arrival": {
                            "iataCode": "YYZ",
                            "terminal": "1",
                            "at": new Date("2024-08-01T18:50:00")
                        },
                        "carrierCode": "AC",
                        "number": "93",
                        "aircraft": {
                            "code": "788"
                        },
                        "operating": {
                            "carrierCode": "AC"
                        },
                        "duration": "PT10H50M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    },
                    {
                        "departure": {
                            "iataCode": "YYZ",
                            "terminal": "1",
                            "at": new Date("2024-08-01T22:00:00")
                        },
                        "arrival": {
                            "iataCode": "YVR",
                            "terminal": "M",
                            "at": new Date("2024-08-02T00:06:00")
                        },
                        "carrierCode": "AC",
                        "number": "129",
                        "aircraft": {
                            "code": "321"
                        },
                        "operating": {
                            "carrierCode": "AC"
                        },
                        "duration": "PT5H6M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    },
                    {
                        "departure": {
                            "iataCode": "YVR",
                            "terminal": "M",
                            "at": new Date("2024-08-02T13:00:00")
                        },
                        "arrival": {
                            "iataCode": "NRT",
                            "terminal": "1",
                            "at": new Date("2024-08-03T14:55:00")
                        },
                        "carrierCode": "AC",
                        "number": "3",
                        "aircraft": {
                            "code": "789"
                        },
                        "operating": {
                            "carrierCode": "AC"
                        },
                        "duration": "PT9H55M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    }
                ]
            }
        ],
        "price": {
            "currency": "CLP",
            "total": "2769705.00",
            "base": "2294250.00",
            "fees": [
                {
                    "amount": "0.00",
                    "type": "SUPPLIER"
                },
                {
                    "amount": "0.00",
                    "type": "TICKETING"
                }
            ],
            "grandTotal": "2769705.00"
        },
        "pricingOptions": {
            "fareType": [
                "PUBLISHED"
            ],
            "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": [
            "AC"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "CLP",
                    "total": "923235.00",
                    "base": "764750.00"
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "CLP",
                    "total": "923235.00",
                    "base": "764750.00"
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "travelerId": "3",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "CLP",
                    "total": "923235.00",
                    "base": "764750.00"
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "GHVS02TG",
                        "brandedFare": "STANDARD",
                        "brandedFareLabel": "STANDARD",
                        "class": "G",
                        "includedCheckedBags": {
                            "quantity": 1
                        },
                        "amenities": [
                            {
                                "description": "CHECKED BAG SECOND",
                                "isChargeable": true,
                                "amenityType": "BAGGAGE",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "COMPLIMENTARY MEAL",
                                "isChargeable": false,
                                "amenityType": "MEAL",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "BASIC SEAT",
                                "isChargeable": false,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            },
                            {
                                "description": "CHANGEABLE TICKET",
                                "isChargeable": true,
                                "amenityType": "BRANDED_FARES",
                                "amenityProvider": {
                                    "name": "BrandedFare"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
]


export default function Page() {
    const [data, setData] = useState<any>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [travelers, setTravelers] = useState<number>(1);

    const handleTravelersBtn = (type: 'up' | 'down') => {
        switch (type) {
            case 'up':
                if (travelers < 6) {
                    setTravelers(travelers + 1)
                }
                break;
            case 'down':
                if (travelers > 1) {
                    setTravelers(travelers - 1)
                }
                break;
        }
    }

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
    }

    return (
        <main className="h-full w-11/12 xl:w-10/12 2xl:w-8/12 flex flex-col items-center mx-auto gap-5 pb-5">
            <AnimatePresence mode={"popLayout"}>
                {!data &&
                    <motion.div className="flex gap-2 flex-col items-center p-24 bg-white"
                        layout
                        key={'greetings'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <h1 className='text-3xl font-bold text-center text-blue-600'>Welcome</h1>
                        <span className='text-3xl'>{localStorage?.getItem('name') ?? ''}</span>
                        <span className="text-center">Where are we traveling</span>
                    </motion.div>
                }
                <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ width: '100%' }}
                    className="w-full h-32 bg-white drop-shadow-xl rounded-lg py-7 px-5"
                    onLayoutAnimationComplete={() => {
                        setShowResults(true);
                    }}
                >

                    <form action="" className="flex h-full">
                        <div className="flex gap-4 h-full items-center w-10/12">
                            <SearchInput label="From" id="from" />
                            <SearchInput label="To" id="to" />
                            <fieldset className="flex flex-col h-full">
                                <label htmlFor="date">
                                    <span>Date</span>
                                </label>
                                <input name="date" id="date" type="date" className="rounded outline-blue-500 border-2 px-2 h-full" required />
                            </fieldset>
                            <fieldset className="flex flex-col h-full">
                                <label htmlFor="date">
                                    <span>Return Date</span>
                                </label>
                                <input name="date" id="date" type="date" className="rounded outline-blue-500 border-2 px-2 h-full" />
                            </fieldset>
                            <fieldset className="flex flex-col h-full">
                                <label htmlFor="passengers">Travelers</label>
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button type="button" id="decrement-button"
                                        onClick={() => handleTravelersBtn('down')}
                                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <input type="text" id="quantity-input" onChange={handleTravelerInput} onBlur={(e) => e.currentTarget.value === '0' ? setTravelers(1) : ''} className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" value={travelers} required />
                                    <button type="button" id="increment-button"
                                        onClick={() => handleTravelersBtn('up')}
                                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <button
                            onClick={(e) => { setData('a') }}
                            type="button"
                            className="bg-blue-600 text-white text-2xl rounded h-full ml-auto aspect-square grid place-items-center">
                            <FaSearch />
                        </button>
                    </form>
                </motion.div>
                {showResults &&
                    <motion.div
                        layout
                        key={'results'}
                        initial={{ maxHeight: 0, overflow: 'hidden' }}
                        animate={{ maxHeight: '100%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="w-full h-full max-h-full bg-white drop-shadow-xl rounded-lg py-7 px-5 flex-1">

                        <div className="grid grid-cols-2 gap-2" >
                            {TRIPS.map((trip, index) => (
                                <TripCard trip={trip} key={index} />
                            ))}
                        </div>
                    </motion.div>}

            </AnimatePresence>
        </main>
    );
}