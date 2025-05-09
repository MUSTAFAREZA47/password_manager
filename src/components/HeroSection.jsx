'use client'
import React from 'react'
import { SparklesCore } from './ui/sparkles'
import Link from 'next/link'

export function HeroSection() {
    return (
        <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden px-6">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
            
            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-center text-white relative z-20 leading-tight animate-slide-up">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Secure. Simplify.
                    </span>
                    <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Remember Less.
                    </span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
                    Your secure password manager for a simpler digital life. Store, generate, and manage your passwords with ease.
                </p>
            </div>

            {/* Sparkle Animation & Gradients */}
            <div className="relative w-full max-w-4xl h-40 mt-6 md:mt-10">
                {/* Horizontal Gradients */}
                <div className="absolute inset-x-16 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-16 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-40 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[4px] w-1/4 blur-sm" />
                <div className="absolute inset-x-40 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Sparkles Effect */}
                <SparklesCore
                    background="transparent"
                    minSize={0.5}
                    maxSize={1.2}
                    particleDensity={1000}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient for Edge Blending */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_30%,white)]"></div>
            </div>
        </div>
    )
}
