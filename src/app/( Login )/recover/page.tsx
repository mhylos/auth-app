'use client';

import { PageWrapper } from '@/app/ui/components';
import ChangePassword from '@/app/ui/recover/ChangePassword';
import RecoverForm from '@/app/ui/recover/RecoverForm';
import { useState } from 'react';

export default function Page() {
	const [email, setEmail] = useState('');
	const [recoverToken, setRecoverToken] = useState<string>();

	return (
		<PageWrapper>
			<div className='z-[2] w-full bg-white bg-opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-95 dark:border-gray-700'>
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
						Recuperar contraseña
					</h1>
					{!recoverToken ? (
						<RecoverForm
							setToken={setRecoverToken}
							email={email}
							setEmail={setEmail}
						/>
					) : (
						<PageWrapper className=''>
							<ChangePassword email={email} />
						</PageWrapper>
					)}
				</div>
			</div>
		</PageWrapper>
	);
}
