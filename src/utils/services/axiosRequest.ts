import { axiosInstance } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { IUseAxios } from '../types';

export default async function axiosRequest<R>(request: IUseAxios) {
  // console.log(request.data);
  return await axiosInstance.request<any, AxiosResponse<R>, any>(request);
}
