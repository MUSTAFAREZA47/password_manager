'use client'
import Image from 'next/image'
import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa'

export function RandomPassword() {
    const [length, setLength] = useState('')
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState('')
    const [copied, setCopied] = useState(false)

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
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [password])

    useEffect(() => {
        passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])

    return (
        <div className="md:grid flex flex-col-reverse md:grid-cols-2 items-center mb-20 animate-fade-in">
            {/* Left Section */}
            <div className="relative flex flex-col justify-center px-6 md:px-16 py-10 text-white w-full overflow-hidden">
                {/* Blurry Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 blur-3xl opacity-30 animate-pulse"></div>

                {/* Content Section */}
                <div className="relative z-10 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Generate Your Password
                    </h1>

                    {/* Input Field & Copy Button */}
                    <div className="flex overflow-hidden mb-8 border border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <input
                            type="text"
                            value={password}
                            className="w-full p-4 bg-zinc-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
                            placeholder="Generated Password"
                            readOnly
                            ref={passwordRef}
                        />
                        <button
                            onClick={copyPasswordToClipboard}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-lg font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                            {copied ? (
                                <>
                                    <FaCheck className="text-green-400" />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <FaCopy />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Password Length Slider */}
                    <div className="flex flex-col gap-6 text-sm">
                        <div className="flex items-center justify-between">
                            <label className="font-medium text-lg">
                                Length: <span className="text-blue-400">{length}</span>
                            </label>
                            <input
                                type="range"
                                min={6}
                                max={50}
                                value={length}
                                className="cursor-pointer w-3/4 accent-blue-500"
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-3 group">
                                <input
                                    type="checkbox"
                                    id="numberInput"
                                    defaultChecked={numberAllowed}
                                    onChange={() => setNumberAllowed((prev) => !prev)}
                                    className="w-5 h-5 accent-blue-600 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                                />
                                <label
                                    htmlFor="numberInput"
                                    className="cursor-pointer text-lg font-medium group-hover:text-blue-400 transition-colors duration-200"
                                >
                                    Include Numbers
                                </label>
                            </div>
                            <div className="flex items-center gap-x-3 group">
                                <input
                                    type="checkbox"
                                    id="characterInput"
                                    defaultChecked={charAllowed}
                                    onChange={() => setCharAllowed((prev) => !prev)}
                                    className="w-5 h-5 accent-blue-600 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                                />
                                <label
                                    htmlFor="characterInput"
                                    className="cursor-pointer text-lg font-medium group-hover:text-blue-400 transition-colors duration-200"
                                >
                                    Include Special Characters
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex justify-center items-center p-6 animate-scale-in">
                <div className="relative w-full max-w-[400px] md:max-w-[500px] transform hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/password.png"
                        width={800}
                        height={800}
                        alt="password"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}


