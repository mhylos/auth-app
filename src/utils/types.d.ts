export interface IUseAxios {
	url: string;
	method: 'get' | 'post' | 'put' | 'delete';
	data?: any;
}

export type UserType = {
	id: number;
	name: string;
	email: string;
	token: string;
};

export type MessageResponseType = {
	message: string;
};

export type responseType<R> = {
	data?: R;
	errorMessage: string;
	hasError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	reFetch: [any, DispatchWithoutAction];
};
