'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce";

interface SearchInputProps {
    label: string;
    id: string;
}

export default function SearchInput({ label, id }: SearchInputProps) {
    const [results, setResults] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [debouncedValue] = useDebounce(inputValue, 700);
    const [selectedResult, setSelectedResult] = useState<string>('');

    useEffect(() => {
        if (debouncedValue) {
            setResults(['result 1', 'result 2', 'result 3', 'result 4', 'result 5'])
        } else {
            setResults([])
        }
    }, [debouncedValue])

    return (
        <fieldset className="flex flex-col h-full flex-1">
            <label htmlFor={id}>
                <span>{label}</span>
            </label>
            <div className="relative h-full">
                <input name={id}
                    id={id}
                    type="text"
                    value={selectedResult ? selectedResult : inputValue}
                    className="absolute rounded outline-blue-500 border-2 px-2 h-full w-full"
                    onBlur={() => {
                        setResults([])
                    }}
                    onChange={(e) => {
                        setInputValue(e.currentTarget.value)
                    }} />
                {results.length > 0 &&
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.1 }}
                        className="w-full absolute top-full p-2 bg-white rounded max-h-48 overflow-y-auto">
                        <ul>
                            {results.map((result, index) => (
                                <li
                                    onClick={() => {
                                        setResults([])
                                        setSelectedResult(result)
                                    }}
                                    key={index}
                                    className="p-2 hover:bg-gray-200 rounded cursor-pointer">{result}</li>
                            ))}
                        </ul>
                    </motion.div>
                }
            </div>

        </fieldset>
    )
}