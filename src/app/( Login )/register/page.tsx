'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IoCheckmark, IoCloseOutline } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';

import { CustomInput, PageWrapper } from '@/app/ui/components';
import { MessageResponseType, UserType } from '@/utils/types';
import { useLazyAxios } from '@/hooks';

export default function Page() {
	const router = useRouter();

	const [busImage, setBusImage] = useState('bus_coming');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [register, response, reset] = useLazyAxios<UserType>();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== confirmPassword) return;
		register({
			url: '/register',
			method: 'post',
			data: {
				name,
				email,
				password,
			},
		});
	};

	useEffect(() => {
		setTimeout(() => {
			if (busImage === 'bus_coming') {
				setBusImage('bus_waiting');
				return;
			}
		}, 1650);
	}, [busImage]);

	useEffect(() => {
		if (response.hasError) {
			reset();
		}
	}, [name, email, password, confirmPassword]);

	useEffect(() => {
		if (response.isSuccess) {
			localStorage.setItem('token', response?.data?.token!);
			if (busImage === 'bus_waiting') {
				setBusImage('bus_going');
				setTimeout(() => {
					router.push('/');
				}, 2000);
				return;
			}
		}
	}, [response.isSuccess, router, busImage]);

	return (
		<PageWrapper>
			<>
				<div className='absolute top-0 left-0 w-full h-full z-[1]'>
					<Image
						src='/register_bg.webp'
						className='absolute top-0 left-0 '
						alt='bg'
						layout='fill'
					/>
					<Image
						src={`/bus_coming.webp`}
						className='absolute bottom-0 left-0 '
						alt='bg'
						layout='fill'
						style={{
							opacity: busImage === 'bus_coming' ? 1 : 0,
							visibility: busImage === 'bus_coming' ? 'visible' : 'hidden',
						}}
						quality={100}
					/>
					<Image
						src={`/bus_waiting.webp`}
						className='absolute bottom-0 left-0 '
						alt='bg'
						layout='fill'
						style={{
							opacity: busImage === 'bus_waiting' ? 1 : 0,
							visibility: busImage === 'bus_waiting' ? 'visible' : 'hidden',
						}}
						quality={100}
					/>
					<Image
						src={`/bus_going.webp`}
						className='absolute bottom-0 left-0 '
						alt='bg'
						layout='fill'
						style={{
							opacity: busImage === 'bus_going' ? 1 : 0,
							visibility: busImage === 'bus_going' ? 'visible' : 'hidden',
						}}
						quality={100}
					/>
				</div>
				<div className='z-[2] w-full bg-white bg-opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-95 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Crea una cuenta
						</h1>
						<form
							className='space-y-4 md:space-y-6 flex flex-col items-center'
							onSubmit={onSubmit}
						>
							<CustomInput
								id='name'
								label='Tu nombre'
								type='name'
								placeholder='John Doe'
								required={true}
								onChange={e => setName(e.target.value)}
							/>
							<CustomInput
								id='email'
								label='Tu correo electrónico'
								type='email'
								placeholder='name@company.com'
								required={true}
								onChange={e => setEmail(e.target.value)}
							/>
							<CustomInput
								id='password'
								label='Contraseña'
								type='password'
								placeholder='••••••••'
								required={true}
								onChange={e => setPassword(e.target.value)}
							/>
							<CustomInput
								id='confirm-password'
								label='Confirmar Contraseña'
								type='password'
								placeholder='••••••••'
								required={true}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
							<div className='w-full flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='terms'
										aria-describedby='terms'
										type='checkbox'
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
										required={true}
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label
										htmlFor='terms'
										className='font-light text-gray-500 dark:text-gray-300'
									>
										Acepto los{' '}
										<Link
											className='font-medium text-primary-600 hover:underline dark:text-primary-500'
											href='#'
										>
											términos y condiciones
										</Link>
									</label>
								</div>
							</div>
							<button
								type='submit'
								disabled={response.isLoading}
								className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn
                ${response.isLoading && 'isLoading'} 
                ${response.isSuccess && 'isSuccess'} 
                ${response.hasError && 'hasError'}`}
							>
								{!(
									response.isLoading ||
									response.isSuccess ||
									response.hasError
								) && 'Crear cuenta'}
								{response.isLoading && <PulseLoader className='pulseLoader' />}
								{response.isSuccess && <IoCheckmark className='icon' />}
								{response.hasError && <IoCloseOutline className='icon' />}
							</button>
							<p className='w-full text-sm font-light text-gray-500 dark:text-gray-400'>
								¿Ya tienes una cuenta?{' '}
								<Link
									href='/login'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Inicia sesión
								</Link>
							</p>
						</form>
					</div>
				</div>
			</>
		</PageWrapper>
	);
}
