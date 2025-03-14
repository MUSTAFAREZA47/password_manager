'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSignup = async () => {
        setError('')
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
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-6 pt-[200px] pb-[100px] bg-black text-white">
                <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
                <div className="flex flex-col gap-2 w-80">
                    <input
                        className="p-2 bg-gray-800 rounded"
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="p-2 bg-gray-800 rounded"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="p-2 bg-gray-800 rounded"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="p-2 bg-green-500 rounded hover:bg-green-600"
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <p className="mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-400">
                        Login
                    </a>
                </p>
            </div>
            <Footer />
        </>
    )
}
