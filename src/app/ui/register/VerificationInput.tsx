import { useEffect, useRef } from 'react';

interface VerificationInputProps {
	emailSent: boolean;
	timer: number;
	setTimer: (timer: number) => void;
	setCode: (code: string[]) => void;
}

export default function VerificationInput({
	emailSent,
	timer,
	setTimer,
	setCode,
}: VerificationInputProps) {
	const codeRef = useRef<HTMLInputElement[]>([]);
	const codeLength = 6;
	const backKeys = ['Backspace', 'Delete', 'ArrowLeft'];
	const forwardKeys = ['ArrowRight', 'Tab'];
	const enabledClasses =
		'bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-fit justify-self-end';

	if (!emailSent) {
		return (
			<div>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					Ingresa tu correo electrónico y te enviaremos un correo con las
					instrucciones para recuperar tu contraseña.
				</p>
			</div>
		);
	}

	return (
		<div className='self-start grid grid-cols-[75%_25%] w-full'>
			<p className='text-sm text-gray-500 dark:text-gray-400 col-span-2'>
				Ingresa el código que te enviamos a tu correo electrónico.
			</p>
			<div className='flex space-x-2'>
				{Array.from(Array(codeLength).keys()).map((_, i) => (
					<input
						key={i}
						ref={el => (codeRef.current[i] = el!)}
						type='text'
						maxLength={1}
						className='w-10 h-10 text-center text-2xl border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
						onChange={e => {
							setCode([...codeRef.current.map(el => el.value)]);
						}}
						onKeyDown={e => {
							if (backKeys.includes(e.key)) {
								if (i > 0) {
									setTimeout(() => {
										codeRef.current[i - 1].focus();
									}, 0);
								}
							} else if (
								forwardKeys.includes(e.key) ||
								e.key.match(/[0-9a-zA-Z]/)
							) {
								if (i < codeLength - 1) {
									setTimeout(() => {
										codeRef.current[i + 1].focus();
									}, 0);
								}
							}
						}}
					/>
				))}
			</div>
			{emailSent ? (
				<button
					className={`overflow-hidden transition-all items-center flex gap-1 justify-center w-full h-full ease-in-out p-2.5 text-white font-medium rounded-lg text-sm text-center ${
						timer > 0 ? '' : enabledClasses
					}`}
					disabled={timer > 0}
					onClick={() => setTimer(15)}
				>
					{timer > 0 ? (
						<>
							<span>{`${timer}`}</span>
							<span className='text-xs'>segundos</span>
						</>
					) : (
						'Reenviar'
					)}
				</button>
			) : (
				<span className='text-sm text-gray-500 dark:text-gray-400'>
					Ingresa tu correo electrónico y te enviaremos un correo con las
					instrucciones para recuperar tu contraseña.
				</span>
			)}
		</div>
	);
}
