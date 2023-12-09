import { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import VerificationInput from './VerificationInput';
import { PageWrapper } from '../components';

interface RecoverFormProps {
	setToken: (token: string) => void;
}

export default function RecoverForm({ setToken }: RecoverFormProps) {
	const [email, setEmail] = useState('');
	const [emailSent, setEmailSent] = useState(false);
	const [emailTimer, setEmailTimer] = useState(0);
	const [verificationCode, setVerificationCode] = useState<string[]>([]);

	useEffect(() => {
		if (emailTimer > 0) {
			setTimeout(() => {
				setEmailTimer(emailTimer - 1);
			}, 1000);
		}
	}, [emailTimer]);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				setToken('token');
			}}
			className='space-y-4 md:space-y-6 flex flex-col items-center'
		>
			<CustomInput
				id='email'
				label='Tu correo electrónico'
				type='email'
				placeholder='name@company.com'
				required={true}
				onChange={e => setEmail(e.target.value)}
			/>
			<VerificationInput
				emailSent={emailSent}
				timer={emailTimer}
				setTimer={setEmailTimer}
				setCode={setVerificationCode}
			/>
			{!emailSent ? (
				<button
					className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 enabled:dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn disabled:opacity-50 disabled:cursor-not-allowed`}
					disabled={email === ''}
					onClick={() => setEmailSent(true)}
				>
					Enviar código
				</button>
			) : (
				<button
					className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 enabled:dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn disabled:opacity-50 disabled:cursor-not-allowed`}
					disabled={
						verificationCode.includes('') || verificationCode.length < 6
					}
				>
					Continuar
				</button>
			)}
		</form>
	);
}
