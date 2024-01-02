'use client';

import router from "next/router";
import { useEffect, useState } from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import PulseLoader from "react-spinners/PulseLoader";

export default function Header() {
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        if (loggingOut) {
            localStorage.removeItem('token');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        }
    }, [loggingOut]);

    return (
        <header className='flex items-center justify-between w-screen px-6 py-4 bg-white'>
            <div className='flex justify-around w-full'>
                <a href='/' className='text-xl font-bold text-gray-800 md:text-2xl flex items-center gap-2'>
                    Turplane <IoAirplaneSharp />
                </a>
                <button
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out p-2.5 px-5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 enabled:dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn disabled:opacity-50 disabled:cursor-not-allowed mt-auto`}
                    disabled={loggingOut}
                    onClick={() => setLoggingOut(true)}
                >
                    {loggingOut ? <PulseLoader className='pulseLoader' /> : 'Log out'}
                </button>
            </div>
        </header>);
}