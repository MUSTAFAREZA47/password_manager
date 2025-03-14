'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { href: '/', label: 'Home' },
        { href: '#', label: 'Generate Random Password' },
        { href: '#', label: 'Save Generated Password' },
    ]

    return (
        <nav className="fixed top-0 left-0 w-full bg-opacity-50 backdrop-blur-lg text-white p-4 shadow-md z-50 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex gap-3 items-center">
                    <Image src="/logo.png" alt="logo" width={35} height={35} />
                    <h1 className="text-3xl md:text-4xl uppercase font-extrabold">
                        Lokify
                    </h1>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-x-6">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.href}
                                className="hover:text-gray-400"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Login Button (Desktop Only) */}
                <Link href="/login" className="hidden md:block">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md">
                        Login
                    </button>
                </Link>

                {/* Mobile Navigation Links */}
                <div
                    className={`fixed top-16 right-5 bg-zinc-900 p-6 rounded-lg shadow-lg transition-all duration-300 ${
                        isOpen ? 'block' : 'hidden'
                    }`}
                >
                    <ul className="flex flex-col gap-y-4">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.href}
                                    className="block hover:text-gray-400 text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
