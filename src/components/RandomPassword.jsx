'use client'
import Image from 'next/image'
import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'

export function RandomPassword() {
    const [length, setLength] = useState('')
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState('')

    //useRef hook
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(() => {
        let pass = ''
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        if (numberAllowed) str += '0123456789'
        if (charAllowed) str += '!@$%^&*+#'

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length)
            pass += str.charAt(char)
        }

        setPassword(pass)
    }, [length, numberAllowed, charAllowed])

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, 999)
        window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
        passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])

    return (
        <div className="md:grid flex flex-col-reverse reverse md:grid-cols-2 items-center mb-20">
            {/* Left Section */}
            <div className="relative flex flex-col justify-center px-6 md:px-16 py-10 text-white w-full overflow-hidden">
                {/* Blurry Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 blur-3xl opacity-30"></div>

                {/* Content Section */}
                <div className="relative z-10  md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                        Generator Your Password
                    </h1>

                    {/* Input Field & Copy Button */}
                    <div className="flex overflow-hidden mb-5 border border-gray-600 rounded-lg">
                        <input
                            type="text"
                            value={password}
                            className="w-full p-3 bg-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
                            placeholder="Generated Password"
                            readOnly
                            ref={passwordRef}
                        />
                        <button
                            onClick={copyPasswordToClipboard}
                            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 text-lg font-semibold transition-all"
                        >
                            Copy
                        </button>
                    </div>

                    {/* Password Length Slider */}
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex items-center justify-between">
                            <label className="font-medium text-lg">
                                Length: {length}
                            </label>
                            <input
                                type="range"
                                min={6}
                                max={50}
                                value={length}
                                className="cursor-pointer w-3/4"
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-x-3">
                                <input
                                    type="checkbox"
                                    id="numberInput"
                                    defaultChecked={numberAllowed}
                                    onChange={() =>
                                        setNumberAllowed((prev) => !prev)
                                    }
                                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                                />
                                <label
                                    htmlFor="numberInput"
                                    className="cursor-pointer text-lg font-medium"
                                >
                                    Include Numbers
                                </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    type="checkbox"
                                    id="characterInput"
                                    defaultChecked={charAllowed}
                                    onChange={() =>
                                        setCharAllowed((prev) => !prev)
                                    }
                                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                                />
                                <label
                                    htmlFor="characterInput"
                                    className="cursor-pointer text-lg font-medium"
                                >
                                    Include Special Characters
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex justify-center items-center p-6">
                <Image
                    src="/password.png"
                    width={800}
                    height={800}
                    alt="password"
                    className="w-full max-w-[400px] md:max-w-[500px]"
                />
            </div>
        </div>
    )
}


