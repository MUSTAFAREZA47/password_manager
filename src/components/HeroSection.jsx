'use client'
import React from 'react'
import { SparklesCore } from './ui/sparkles'

export function HeroSection() {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden px-6">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-extrabold text-center text-white relative z-20 leading-tight">
                Secure. Simplify. <br className="hidden md:block" /> Remember
                Less.
            </h1>

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
                    particleDensity={1000} // Optimized for better FPS
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient for Edge Blending */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_30%,white)]"></div>
            </div>
        </div>
    )
}
