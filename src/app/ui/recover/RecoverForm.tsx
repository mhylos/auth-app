import { FormEvent, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import VerificationInput from './VerificationInput';
import { useLazyAxios } from '@/hooks';
import { MessageResponseType } from '@/utils/types/types';
import { browserName, osVersion, osName } from 'react-device-detect';
import PulseLoader from 'react-spinners/PulseLoader';

interface RecoverFormProps {
	setToken: (token: string) => void;
	setEmail: (email: string) => void;
	email: string;
}

const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export default function RecoverForm({
	setToken,
	email,
	setEmail,
}: RecoverFormProps) {
	const [emailSent, setEmailSent] = useState(false);
	const [emailTimer, setEmailTimer] = useState(0);
	const [verificationCode, setVerificationCode] = useState<string[]>([]);
	const [send, response] = useLazyAxios<MessageResponseType>();
	const [verify, verifyResponse] = useLazyAxios<MessageResponseType>();

	useEffect(() => {
		if (emailTimer > 0) {
			setTimeout(() => {
				setEmailTimer(emailTimer - 1);
			}, 1000);
		}
	}, [emailTimer]);

	const sendEmail = () => {
		if (email === '' || !validateEmail(email)) return;
		const browser = browserName;
		const os = osName + ' ' + osVersion;

		send({
			method: 'post',
			url: '/recover/request-code',
			data: { email, webBrowser: browser, os },
		});
	};

	useEffect(() => {
		if (response?.data?.message === 'Email sent') {
			setEmailSent(true);
			setEmailTimer(60);
		}
	}, [response.data]);

	const verifyCode = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (verificationCode.length < 6 || verificationCode.includes('')) return;
		verify({
			method: 'post',
			url: '/recover/validate-code',
			data: { email, code: verificationCode.join('') },
		});
	};

	useEffect(() => {
		if (verifyResponse?.data?.message) {
			setToken(verificationCode.join(''));
		}
	}, [verifyResponse.data]);

	return (
		<form
			onSubmit={verifyCode}
			className='space-y-4 md:space-y-6 flex flex-col items-center'
		>
			<CustomInput
				id='email'
				label='Tu correo electrónico'
				type='email'
				placeholder='name@company.com'
				required={true}
				disabled={response.isSuccess || response.isLoading}
				onChange={e => setEmail(e.target.value)}
			/>
			<VerificationInput
				emailSent={emailSent}
				timer={emailTimer}
				sendEmail={sendEmail}
				setCode={setVerificationCode}
			/>
			{!emailSent ? (
				<button
					className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 enabled:dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn disabled:opacity-50 disabled:cursor-not-allowed`}
					disabled={response.isLoading || email === ''}
					onClick={sendEmail}
				>
					{response.isLoading ? (
						<PulseLoader className='pulseLoader' />
					) : (
						'Enviar código'
					)}
				</button>
			) : (
				<button
					className={`relative overflow-hidden transition-all duration-500 w-full aspect-[12/2] ease-in-out p-2.5 text-white bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 enabled:dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                btn disabled:opacity-50 disabled:cursor-not-allowed`}
					disabled={
						verificationCode.includes('') ||
						verificationCode.length < 6 ||
						verifyResponse.isLoading
					}
				>
					{verifyResponse.isLoading ? (
						<PulseLoader className='pulseLoader' />
					) : (
						'Continuar'
					)}
				</button>
			)}
		</form>
	);
}
