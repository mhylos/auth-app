'use client';

import useLazyAxios from '@/hooks/useLazyAxios';
import { MessageResponseType } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default function ChangePassword({ email }: { email: string }) {
	const [error, setError] = useState('');
	const [changePw, { isLoading, isSuccess }] =
		useLazyAxios<MessageResponseType>();
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const password = formData.get('password');
		const passwordConfirm = formData.get('password-confirm');

		if (password !== passwordConfirm) {
			setError('Las contraseñas no coinciden');
			return;
		}

		setError('');

		changePw({
			url: '/recover/change-password',
			method: 'post',
			data: {
				email,
				password,
			},
		});
	};

	useEffect(() => {
		if (isSuccess) {
			setError('Contraseña cambiada con éxito');
			setTimeout(() => {
				router.push('/login');
			}, 2500);
		}
	}, [isSuccess]);

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 md:space-y-6 flex flex-col'
		>
			<div className='flex flex-col space-y-2'>
				<label
					htmlFor='password'
					className='text-sm font-medium text-gray-700 dark:text-gray-200'
				>
					Contraseña
				</label>
				<input
					id='password'
					type='password'
					name='password'
					placeholder='********'
					className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
				/>
			</div>
			<div className='flex flex-col space-y-2'>
				<label
					htmlFor='password-confirm'
					className='text-sm font-medium text-gray-700 dark:text-gray-200'
				>
					Confirmar contraseña
				</label>
				<input
					id='password-confirm'
					type='password'
					name='password-confirm'
					placeholder='********'
					className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
				/>
			</div>

			<span
				className={`text-sm font-medium ${
					isSuccess ? 'text-primary-500' : 'text-red-500'
				}`}
			>
				{' '}
				{error}
			</span>
			<button
				className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm text-center btn disabled:opacity-50 disabled:cursor-not-allowed`}
				disabled={isLoading || isSuccess}
			>
				{isLoading ? (
					<PulseLoader className='pulseLoader' />
				) : (
					'Cambiar contraseña'
				)}
			</button>
		</form>
	);
}
