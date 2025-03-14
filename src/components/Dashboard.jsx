'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Dashboard() {
    const router = useRouter()
    const [passwords, setPasswords] = useState([])
    const [website, setWebsite] = useState('')
    const [password, setPassword] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        const savedToken = Cookies.get('token')
        if (!savedToken) {
            router.replace('/login')
            return
        }
        setToken(savedToken)
        fetchPasswords(savedToken)
    }, [])

    const fetchPasswords = async (authToken) => {
        try {
            const res = await fetch('/api/passwords', {
                headers: { Authorization: `Bearer ${authToken}` },
            })
            if (!res.ok) throw new Error('Failed to fetch passwords')

            const data = await res.json()
            setPasswords(data) // ✅ No need for decryption
        } catch (err) {
            setError('Failed to load passwords')
        }
    }

    const handleSave = async () => {
        if (!website || !password) {
            setError('Website and password are required')
            return
        }
        setError('')

        try {
            if (!token) {
                setError('Unauthorized! Please login again.')
                return
            }

            const res = await fetch(
                editingId ? `/api/passwords/${editingId}` : '/api/passwords',
                {
                    method: editingId ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ website, password }),
                },
            )

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.error || 'Something went wrong')
                return
            }

            fetchPasswords(token) // ✅ Fetch updated passwords
            setWebsite('')
            setPassword('')
            setEditingId(null)
        } catch (err) {
            setError('Failed to save password. Please try again.')
            console.error('Error:', err)
        }
    }

    const handleDelete = async (id) => {
        try {
            if (!token) {
                setError('Unauthorized! Please login again.')
                return
            }

            const res = await fetch(`/api/passwords/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.error || 'Failed to delete password')
                return
            }

            fetchPasswords(token) // ✅ Fetch updated passwords
        } catch (err) {
            setError('Failed to delete password. Please try again.')
            console.error('Error:', err)
        }
    }

    const handleLogout = () => {
        Cookies.remove('token')
        router.push('/login')
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        alert('Password copied to clipboard!')
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-black text-white min-h-screen">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    📝 Secure Your Passwords – Never Forget Again!
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                    Store all your important passwords in one secure place.
                    Quickly add, edit, or delete saved credentials with ease.
                </p>
            </div>

            {/* Password Form */}
            <div className="space-y-4">
                <input
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    type="text"
                    placeholder="Website Name"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <div className="flex gap-2">
                    <input
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                        onClick={() = ()}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button> */}
                </div>
                <button
                    className="w-full bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={handleSave}
                >
                    {editingId ? 'Update' : 'Save'}
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Password List */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">
                    Saved Passwords
                </h3>
                {passwords.length === 0 ? (
                    <p>No passwords saved</p>
                ) : (
                    passwords.map((item) => (
                        <div
                            key={item._id}
                            className="p-4 bg-zinc-900 border border-gray-600 rounded-lg shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-2 md:space-y-0">
                                <div>
                                    <strong className="text-gray-200">
                                        {item.website}:
                                    </strong>
                                    <span className="text-gray-200 ml-2">
                                        {item.password}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => {
                                            setWebsite(item.website)
                                            setPassword(item.password)
                                            setEditingId(item._id)
                                        }}
                                        className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 text-sm"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 text-sm"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(item.password)
                                        }
                                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 text-sm"
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Logout Button */}
            <button
                className="mt-6 p-2 bg-red-500 rounded hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}
