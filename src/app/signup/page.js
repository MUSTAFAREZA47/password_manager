'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'
import Link from 'next/link'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSignup = async () => {
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.error)
                return
            }

            router.push('/login')
        } catch (err) {
            setError('Something went wrong. Please try again.')
            console.error('Signup error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
                {/* Background Gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" /> */}
                
                {/* Signup Form */}
                <div className="relative z-10 w-full max-w-md animate-fade-in">
                    <div className="glass-effect p-8 rounded-2xl shadow-2xl">
                        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        
                        <div className="space-y-4">
                            {/* Username Input */}
                            <div className="relative">
                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div> */}
                                <input
                                    className="input-modern pl-10"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div> */}
                                <input
                                    className="input-modern pl-10"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div> */}
                                <input
                                    className="input-modern pl-10"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Signup Button */}
                            <button
                                className="btn-primary w-full flex items-center justify-center gap-2"
                                onClick={handleSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FaUserPlus />
                                        <span>Sign Up</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center animate-fade-in">
                                {error}
                            </div>
                        )}

                        {/* Login Link */}
                        <p className="mt-6 text-center text-gray-400">
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
