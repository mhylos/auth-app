import { AxiosResponse } from 'axios';

import { axiosRequest } from '@/utils/services';

import { IUseAxios, responseType } from '@/utils/types/types';

import { useState } from 'react';

export default function useLazyAxios<R>(): [
	(request: IUseAxios) => Promise<AxiosResponse<R, any>>,
	Omit<responseType<R>, 'reFetch'>,
	() => void,
] {
	const [response, setResponse] = useState<Omit<responseType<R>, 'reFetch'>>({
		data: undefined,
		errorMessage: '',
		hasError: false,
		isLoading: false,
		isSuccess: false,
	});

	const request = (request: IUseAxios) => {
		if (!response.isLoading) {
			setResponse(prev => {
				return {
					...prev,
					isLoading: true,
				};
			});
		}
		const r = axiosRequest<R>(request);
		r.then(({ data }) => {
			return setResponse({
				data,
				errorMessage: '',
				hasError: false,
				isLoading: false,
				isSuccess: true,
			});
		}).catch(error => {
			console.log(error);
			return setResponse({
				data: undefined,
				errorMessage: error?.message ?? error?.response?.data?.message,
				hasError: true,
				isLoading: false,
				isSuccess: false,
			});
		});

		return r;
	};

	const reset = () => {
		setResponse({
			data: undefined,
			errorMessage: '',
			hasError: false,
			isLoading: false,
			isSuccess: false,
		});
	};

	return [request, response, reset];
}
