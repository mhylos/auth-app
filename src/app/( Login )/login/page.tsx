'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PulseLoader from 'react-spinners/PulseLoader';
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5';

import { UserType } from '@/utils/types';
import { PageWrapper, CustomInput } from '@/app/ui/components';
import { useLazyAxios } from '@/hooks';

export default function Page() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [login, response, reset] = useLazyAxios<UserType>();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login({
			url: '/login',
			method: 'post',
			data: {
				email,
				password,
			},
		});
	};

	useEffect(() => {
		if (response.data) {
			localStorage.setItem('token', response.data.token);
		}
	}, [response]);

	useEffect(() => {
		if (response.hasError) {
			reset();
		}
	}, [email, password]);

	useEffect(() => {
		console.log(response);
	}, [response]);

	return (
		<PageWrapper>
			<>
				<div className='clouds'>
					<Image
						className='clouds_left'
						src='/cloud0.webp'
						alt='Nube'
						width={1920}
						height={1080}
					/>
					<Image
						className='clouds_right'
						src='/cloud1.webp'
						alt='Nube'
						width={1920}
						height={1080}
						onAnimationEnd={e => {
							e.currentTarget.style.animation =
								'cloudBehind 60s infinite linear';
						}}
					/>
				</div>
				<Image
					className={`plane ${response.data ? 'animated-plane' : ''}`}
					src={response.data ? '/plane-animated.webp' : '/plane.webp'}
					alt='Avión volando'
					width={630}
					height={540.5}
					onTransitionEnd={e => {
						if (response.data) {
							e.currentTarget.style.display = 'none';
							router.push('/');
						}
					}}
				/>

				<div className='z-[1]  w-full bg-white bg-opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-95 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Inicia sesión en tu cuenta
						</h1>
						<form
							className='space-y-4 md:space-y-6 flex flex-col items-center'
							onSubmit={onSubmit}
						>
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
							<div className='w-full flex items-center justify-between'>
								<div className='flex items-start'>
									{/* <div className='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
											required={false}
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='remember'
											className='text-gray-500 dark:text-gray-300'
										>
											Recordar contraseña
										</label>
									</div> */}
								</div>
								<Link
									href='/recover'
									className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
							<button
								type='submit'
								disabled={response.isLoading}
								className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 btn
                ${response.isLoading && 'isLoading'} 
                ${response.isSuccess && 'isSuccess'} 
                ${response.hasError && 'hasError'}`}
							>
								{!(
									response.isLoading ||
									response.isSuccess ||
									response.hasError
								) && 'Iniciar sesión'}
								{response.isLoading && <PulseLoader className='pulseLoader' />}
								{response.isSuccess && <IoCheckmark className='icon' />}
								{response.hasError && <IoCloseOutline className='icon' />}
							</button>
							<p className='w-full text-sm font-light text-gray-500 dark:text-gray-400'>
								¿No tienes una cuenta?{' '}
								<Link
									href='/register'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Regístrate
								</Link>
							</p>
						</form>
					</div>
				</div>
			</>
		</PageWrapper>
	);
}
