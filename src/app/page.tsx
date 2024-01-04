'use client';

import { useAxios } from '@/hooks';
import { UserType } from '@/utils/types/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { PulseLoader } from 'react-spinners';

// import { useAxios } from '@/hooks';

export default function Page() {
	const { data, isLoading, hasError } = useAxios<UserType>({
		method: 'get',
		url: '/login/re-validate',
	});
	const router = useRouter();

	useEffect(() => {
		if (hasError) {
			localStorage.removeItem('token');
			router.push('/login');
			return
		}
		if (!isLoading && !hasError && data) {
			localStorage.setItem('name', data.name);
			router.push('/home');
		}
	}, [hasError, isLoading]);

	if (isLoading || hasError) {
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
}
