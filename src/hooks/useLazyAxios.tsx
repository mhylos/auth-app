import { axiosRequest } from '@/utils/services';

import { MessageResponseType, IUseAxios, responseType } from '@/utils/types';

import { useState } from 'react';

export default function useLazyAxios<R>(): [
  (request: IUseAxios) => Promise<boolean>,
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

  const request = async (request: IUseAxios) => {
    setResponse(prev => {
      return {
        ...prev,
        isLoading: true,
      };
    });
    axiosRequest<R>(request)
      .then(({ data }) => {
        return setResponse(prev => {
          return {
            ...prev,
            data,
            errorMessage: '',
            hasError: false,
            isLoading: false,
            isSuccess: true,
          };
        });
      })
      .catch(error => {
        return setResponse(prev => {
          return {
            ...prev,
            data: undefined,
            errorMessage: error.response.data.message,
            hasError: true,
            isLoading: false,
          };
        });
      });
    return true;
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
