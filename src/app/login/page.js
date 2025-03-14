'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie' // ✅ Correct import for frontend
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            })

            const data = await res.json()
            console.log(data)
            if (!res.ok) {
                setError(data.error || 'Login failed')
                return
            }

            // ✅ Ensure token is stored correctly in cookies
            Cookies.set('token', data.token, {
                expires: 7,
                secure: true,
                path: '/',
            })

            // ✅ Delay redirect to ensure cookie is set
            setTimeout(() => {
                router.replace('/dashboard')
            }, 100)
        } catch (err) {
            setError('Something went wrong. Please try again.')
            console.error('Login error:', err)
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-6 pt-[200px] pb-[100px] bg-black text-white">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <div className="flex flex-col gap-2 w-80">
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
                        className="p-2 bg-blue-500 rounded hover:bg-blue-600"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <p className="mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-400">
                        Sign up
                    </a>
                </p>
            </div>
            <Footer />
        </>
    )
}
