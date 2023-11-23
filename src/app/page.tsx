'use client';

import { PulseLoader } from 'react-spinners';

import { useAxios } from '@/hooks';

export default function Page() {
  const { data, isLoading, isSuccess, hasError, errorMessage } = useAxios<{
    name: string;
    email: string;
  }>({
    url: '/user/',
    method: 'get',
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading && <PulseLoader />}
      {isSuccess && 'name' in data! && <p>{data?.name}</p>}
      {hasError && <p>{errorMessage}</p>}
    </main>
  );
}
