'use client'

import { useEffect, useRef } from "react";

export default function Page() {
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (localStorage.getItem('name') && form.current) {
            const nameInputValue = (document.getElementById('name') as HTMLInputElement);
            const name = localStorage.getItem('name');
            nameInputValue.value = name ? name : '';
        }
    }, [form]);

    return (
        <>
            <main className='h-full w-11/12 xl:w-10/12 2xl:w-8/12 grid grid-cols-3 mx-auto gap-5 pb-5'>
                <section className="col-span-2 bg-white drop-shadow-xl p-4 rounded-xl text-gray-900">
                    <h2 className="text-2xl font-bold">Details</h2>
                    <div>
                        Complete the following form to finish your purchase
                        <form className="max-lg:flex flex-col gap-4 md:grid grid-cols-2" ref={form}>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="font-semibold">Name</label>
                                <input type="text" name="name" id="name" className="border border-gray-300 rounded-md p-2 " />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="font-semibold">Email</label>
                                <input type="email" name="email" id="email" className="border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="phone" className="font-semibold">Phone</label>
                                <input type="phone" name="phone" id="phone" className="border border-gray-300 rounded-md p-2" placeholder="+ 56 9 123 12345" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="address" className="font-semibold">Address</label>
                                <input type="text" name="address" id="address" className="border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="city" className="font-semibold">City</label>
                                <input type="text" name="city" id="city" className="border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="zip" className="font-semibold">Zip</label>
                                <input type="number" name="zip" id="zip" className="border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="country" className="font-semibold">Country</label>
                                <input type="text" name="country" id="country" className="border border-gray-300 rounded-md p-2" />
                            </div>
                        </form>
                    </div>
                </section>
                <section className="bg-white drop-shadow-xl p-4 rounded-xl text-gray-900 flex flex-col">
                    <h2 className="text-2xl font-bold mb-3">Checkout</h2>
                    <div className="flex flex-col">
                        <span>Adult</span>
                        <span>Light Baggage</span>
                        <span>Seat 14</span></div>
                    <hr />
                    <button className="btn mt-auto bg-blue-600 text-white rounded">Finish purchase</button>
                </section>
            </main>
        </>
    );
}