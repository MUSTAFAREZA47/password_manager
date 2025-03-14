import { connectToDB } from '@/lib/mongodb'
import Password from '@/models/password.model'
import jwt from 'jsonwebtoken'


export async function POST(req) {
    try {
        await connectToDB()
        const { website, password } = await req.json()

        const authHeader = req.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const token = authHeader.split(' ')[1]
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)

        const newPassword = new Password({
            userId,
            website,
            password, // ❌ No encryption here
        })

        await newPassword.save()
        return Response.json(newPassword, { status: 201 })
    } catch (error) {
        return Response.json(
            { error: 'Error saving password' },
            { status: 500 },
        )
    }
}


export async function GET(req) {
    try {
        await connectToDB()
        const authHeader = req.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer '))
            return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const token = authHeader.split(' ')[1]
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)

        const passwords = await Password.find({ userId })

        return Response.json(passwords, { status: 200 }) // ✅ No decryption needed
    } catch (error) {
        return Response.json(
            { error: 'Error fetching passwords' },
            { status: 500 },
        )
    }
}

