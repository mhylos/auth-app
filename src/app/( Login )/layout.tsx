'use client';

import { useLazyAxios } from '@/hooks';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	const [checkToken, { isSuccess, isLoading, hasError }] = useLazyAxios<{}>();

	useEffect(() => {
		if (localStorage.token) {
			checkToken({
				url: '/login/re-validate',
				method: 'get',
			});
		}
	}, []);

	useEffect(() => {
		if (isSuccess) {
			redirect('/');
		}
	}, [isSuccess]);

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

	return <>{children}</>;
}
