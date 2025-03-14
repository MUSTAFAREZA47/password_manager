'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { FaUser } from 'react-icons/fa'

export function Navbar() {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const username = Cookies.get('username') // Fetch username from cookies
        if (username) {
            setUser(username)
        }
    }, [])


    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('username') // Remove username on logout
        setUser(null)
        router.push('/login') // Redirect to login page
    }

    return (
        <nav className="fixed top-0 left-0 w-full bg-opacity-50 backdrop-blur-lg text-white p-4 shadow-md z-50 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex gap-3 items-center">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="w-8 md:w-10"
                    />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl uppercase font-extrabold">
                        Lokify
                    </h1>
                </Link>

                {/* Right Side */}
                <div>
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 hover:bg-blue-500 flex gap-1 text-xs text-white px-2 py-1 rounded-md">
                                <FaUser />
                                <span className="font-medium">{user}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-500 text-xs text-white px-2 py-1 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
