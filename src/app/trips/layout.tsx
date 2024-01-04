'use client'

import { useAxios } from "@/hooks";
import Header from "../ui/components/Header";
import Image from 'next/image';
import { UserType } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data, isLoading, hasError } = useAxios<UserType>({
        method: 'get',
        url: '/login/re-validate',
    });
    const router = useRouter();

    useEffect(() => {
        if (hasError) {
            localStorage.removeItem('token');
            router.push('/login');
            return
        }
    }, [hasError]);

    if (isLoading || hasError) {
        return (
            <main className='grid w-screen h-screen place-items-center bg-white'>
                <Image
                    src='/loading-animation.gif'
                    alt='loading-animation'
                    width={600}
                    height={600}
                />
            </main>
        );
    }

    return (
        <>
            <Header />
            {children}
        </>
    );
}