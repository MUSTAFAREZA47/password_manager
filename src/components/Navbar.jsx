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
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const username = Cookies.get('username')
        if (username) {
            setUser(username)
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('username')
        setUser(null)
        router.push('/login')
    }

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-black/80 backdrop-blur-lg shadow-lg' 
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex gap-3 items-center group animate-fade-in"
                    >
                        <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Lokify
                        </h1>
                    </Link>

                    {/* Right Side */}
                    <div className="animate-fade-in">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2">
                                    <FaUser className="text-blue-400" />
                                    <span className="font-medium text-sm">{user}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn-danger text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="btn-primary text-sm"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
