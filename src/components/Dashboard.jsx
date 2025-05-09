'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { FaEdit, FaTrash, FaCopy, FaCheck, FaSignOutAlt } from 'react-icons/fa'

export default function Dashboard() {
    const router = useRouter()
    const [passwords, setPasswords] = useState([])
    const [website, setWebsite] = useState('')
    const [password, setPassword] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const [copiedId, setCopiedId] = useState(null)

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
            setPasswords(data)
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

            fetchPasswords(token)
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

            fetchPasswords(token)
        } catch (err) {
            setError('Failed to delete password. Please try again.')
            console.error('Error:', err)
        }
    }

    const handleLogout = () => {
        Cookies.remove('token')
        router.push('/login')
    }

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-black text-white min-h-screen animate-fade-in">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    📝 Secure Your Passwords
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Store all your important passwords in one secure place.
                    Quickly add, edit, or delete saved credentials with ease.
                </p>
            </div>

            {/* Password Form */}
            <div className="glass-effect p-6 rounded-xl mb-8 animate-slide-up">
                <div className="space-y-4">
                    <input
                        className="input-modern"
                        required
                        type="text"
                        placeholder="Website Name"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <input
                            className="input-modern"
                            required
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn-primary w-full"
                        onClick={handleSave}
                    >
                        {editingId ? 'Update Password' : 'Save Password'}
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 mt-4 text-center animate-fade-in">
                        {error}
                    </p>
                )}
            </div>

            {/* Password List */}
            <div className="mt-8 animate-slide-up">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Saved Passwords
                    </span>
                </h3>
                {passwords.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        No passwords saved yet. Add your first password above!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {passwords.map((item) => (
                            <div
                                key={item._id}
                                className="glass-effect p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-blue-400">
                                            {item.website}
                                        </h4>
                                        <p className="text-gray-300 mt-1 font-mono">
                                            {item.password}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => {
                                                setWebsite(item.website)
                                                setPassword(item.password)
                                                setEditingId(item._id)
                                            }}
                                            className="btn-secondary flex items-center gap-2"
                                        >
                                            <FaEdit />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="btn-danger flex items-center gap-2"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(item.password, item._id)}
                                            className="btn-primary flex items-center gap-2"
                                        >
                                            {copiedId === item._id ? (
                                                <>
                                                    <FaCheck />
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Logout Button */}
            <div className="mt-8 text-center">
                <button
                    className="btn-danger flex items-center gap-2 mx-auto"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
