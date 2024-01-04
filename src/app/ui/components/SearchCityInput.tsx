'use client';

import { useLazyAxios } from '@/hooks';
import { City } from '@/utils/types/types';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface SearchInputProps {
    label: string;
    id: string;
}

export default function SearchCityInput({ label, id }: SearchInputProps) {
    const [results, setResults] = useState<City[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebounce] = useDebounce('', 700);
    const [search] = useLazyAxios<City[]>();
    const inputRef = useRef<HTMLInputElement>(null);

    const searchCity = () => {
        search({
            url: `/tickets/cities?keyword=${debouncedValue}`,
            method: 'get',
        })
            .then(({ data }) => {
                setResults(data);
                // console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (debouncedValue.length > 2) {
            searchCity();
        } else {
            setResults([]);
        }
    }, [debouncedValue]);

    return (
        <fieldset className='flex flex-col h-full flex-1'>
            <label htmlFor={id}>
                <span>{label}</span>
            </label>
            <div className='relative h-full'>
                <input
                    name={id}
                    id={id}
                    type='text'
                    value={inputValue}
                    ref={inputRef}
                    data-iata-code={null}
                    autoComplete="off"
                    className='absolute rounded outline-blue-500 border-2 px-2 h-full w-full'
                    onBlur={() => {
                        setTimeout(() => {
                            setResults([]);
                        }, 250);
                    }}
                    onFocus={(e) => {
                        if (inputValue.length > 2) {
                            searchCity();
                        }
                    }}
                    onChange={e => {
                        setDebounce(e.currentTarget.value);
                        setInputValue(e.currentTarget.value);
                    }}
                />
                {results.length > 0 && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.1 }}
                        className='w-full absolute top-full p-2 bg-white rounded max-h-48 overflow-y-auto'
                    >
                        <ul>
                            {results.map((result, index) => (
                                <li
                                    onClick={() => {
                                        setInputValue(
                                            result.address.cityName +
                                            ', ' +
                                            result.address.countryName,
                                        );
                                        inputRef.current?.setAttribute('data-iata-code', result.iataCode);
                                        setResults([]);
                                    }}
                                    key={index}
                                    className='p-2 hover:bg-gray-200 rounded cursor-pointer  w-full flex flex-col gap-0.5'
                                >
                                    <span className='text-sm line-clamp-1'>
                                        {result.address.cityName + `${result.address.stateCode ? `, ${result.address.stateCode}` : ''} `}
                                    </span>
                                    <span className='text-[10px] text-gray-500 h-min'>
                                        {result.address.countryName}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </fieldset>
    );
}
