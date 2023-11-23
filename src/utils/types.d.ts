export interface IUseAxios {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
}

export type MessageResponseType = {
  message: string;
};

export type responseType<R> = {
  data?: R | MessageResponseType;
  errorMessage: string;
  hasError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  reFetch: [any, DispatchWithoutAction];
};
