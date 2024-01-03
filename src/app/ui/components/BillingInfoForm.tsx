import { BillingInfo } from "@/utils/types/types";
import { Dispatch, SetStateAction } from "react";

interface BillingInfoFormProps {
    setBillingInfo: Dispatch<SetStateAction<BillingInfo>>;
}

export default function BillingInfoForm({ setBillingInfo }: BillingInfoFormProps) {
    return (
        <div>
            Complete the following form to finish your purchase
            <form
                className='max-lg:flex flex-col gap-4 md:grid grid-cols-2'
            >
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='name'
                        className='font-semibold'
                    >
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        className='border border-gray-300 rounded-md p-2'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                name: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='email'
                        className='font-semibold'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className='border border-gray-300 rounded-md p-2'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                email: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='phone'
                        className='font-semibold'
                    >
                        Phone
                    </label>
                    <input
                        type='phone'
                        name='phone'
                        id='phone'
                        className='border border-gray-300 rounded-md p-2'
                        placeholder='+ 56 9 123 12345'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                phone: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='address'
                        className='font-semibold'
                    >
                        Address
                    </label>
                    <input
                        type='text'
                        name='address'
                        id='address'
                        className='border border-gray-300 rounded-md p-2'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                address: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='city'
                        className='font-semibold'
                    >
                        City
                    </label>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        className='border border-gray-300 rounded-md p-2'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                city: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='zip'
                        className='font-semibold'
                    >
                        Zip
                    </label>
                    <input
                        type='number'
                        name='zip'
                        id='zip'
                        className='border border-gray-300 rounded-md p-2'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                zip: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor='country'
                        className='font-semibold'
                    >
                        Country
                    </label>
                    <input
                        type='text'
                        name='country'
                        id='country'
                        className='border border-gray-300 rounded-md p-2'
                        onChange={e => {
                            setBillingInfo((billingInfo) => ({
                                ...billingInfo,
                                country: e.target.value
                            }))
                        }}
                    />
                </div>
            </form>
        </div>
    )
}