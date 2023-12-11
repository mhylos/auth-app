'use client';

import { useAxios } from '@/hooks';
import { MessageResponseType, UserType } from '@/utils/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

// import { PulseLoader } from 'react-spinners';

// import { useAxios } from '@/hooks';

export default function Page() {
	const { data, isLoading, hasError } = useAxios<UserType>({
		method: 'get',
		url: '/login/re-validate',
	});
	const [loggingOut, setLoggingOut] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (hasError) {
			localStorage.removeItem('token');
			router.push('/login');
		}
	}, [hasError]);

	useEffect(() => {
		if (loggingOut) {
			localStorage.removeItem('token');
			setTimeout(() => {
				router.push('/login');
			}, 1000);
		}
	}, [loggingOut]);

	if (isLoading) {
		return (
			<main className='grid w-screen h-screen place-items-center bg-white'>
				<Image
					src='/loading-animation.gif'
					alt='loading-animation'
					width={600}
					height={600}
				/>
			</main>
		);
	}

	return (
		<main className='flex gap-2 min-h-screen flex-col items-center p-24 bg-white'>
			<h1 className='text-3xl font-bold text-center text-blue-600'>Welcome</h1>
			<span className='text-3xl'>{data?.name ?? ''}</span>
			<button
				className={`relative overflow-hidden transition-all duration-500 ease-in-out p-2.5 px-5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 enabled:dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn disabled:opacity-50 disabled:cursor-not-allowed mt-auto`}
				disabled={loggingOut}
				onClick={() => setLoggingOut(true)}
			>
				{loggingOut ? <PulseLoader className='pulseLoader' /> : 'Log out'}
			</button>
		</main>
	);
}
