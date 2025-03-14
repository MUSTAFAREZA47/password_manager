import { connectToDB } from '@/lib/mongodb'
import User from '@/models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req) {
    try {
        await connectToDB()

        const { email, password } = await req.json()
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400 },
            )
        }

        const user = await User.findOne({ email })
        if (!user) {
            return new Response(
                JSON.stringify({
                    error: 'User does not exist. Please sign up.',
                }),
                { status: 401 },
            )
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return new Response(
                JSON.stringify({ error: 'Incorrect Password' }),
                { status: 401 },
            )
        }

        // Generate Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        // Set Cookie
        const cookieStore = cookies()
        cookieStore.set('token', token, { httpOnly: false, secure: true }) // 🔹 Set httpOnly to false for client access
        cookieStore.set('username', user.username, {
            httpOnly: false, // 🔹 Allow client access
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        // Send Response
        return new Response(
            JSON.stringify({
                message: 'Login successful',
                token,
                username: user.username,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    } catch (error) {
        console.error('Login Error:', error)
        return new Response(JSON.stringify({ error: 'Error in Login' }), {
            status: 500,
        })
    }
}
