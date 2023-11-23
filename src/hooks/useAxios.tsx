import { useState, useEffect, useReducer } from 'react';

import { axiosRequest } from '@/utils/services';
import { IUseAxios, responseType } from '@/utils/types';

export default function useAxios<R>(request: IUseAxios): responseType<R> {
  const [response, setResponse] = useState<responseType<R>>({
    data: undefined,
    errorMessage: '',
    hasError: false,
    isLoading: true,
    isSuccess: false,
    reFetch: useReducer(x => x + 1, 0),
  });

  useEffect(() => {
    if (!response.isLoading) {
      setResponse(prev => {
        return {
          ...prev,
          isLoading: true,
        };
      });
    }
    axiosRequest<R>(request)
      .then(({ data }) => {
        console.log(data);
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
  }, [response.reFetch]);

  return response;
}
