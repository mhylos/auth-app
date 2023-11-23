'use client';

// import { PulseLoader } from 'react-spinners';

// import { useAxios } from '@/hooks';

export default function Page() {
  const name = localStorage.getItem('name');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold text-center">Welcome {name}</h1>
      {/* {isLoading && <PulseLoader />} */}
      {/* {isSuccess && 'name' in data! && <p>{data?.name}</p>} */}
      {/* {hasError && <p>{errorMessage}</p>} */}
    </main>
  );
}
