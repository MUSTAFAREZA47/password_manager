import { connectToDB } from '@/lib/mongodb'
import Password from '@/models/password.model'
import jwt from 'jsonwebtoken'

export async function PUT(req, { params }) {
    try {
        await connectToDB()
        const { id } = params

        const { website, password } = await req.json() // Password in plain text ⚠️

        const authHeader = req.headers.get('authorization')
        if (!authHeader)
            return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const token = authHeader.split(' ')[1]
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)

        const existingPassword = await Password.findOne({ _id: id, userId })
        if (!existingPassword)
            return Response.json(
                { error: 'Password not found' },
                { status: 404 },
            )

        existingPassword.website = website
        existingPassword.password = password // ⚠️ No hashing, plain text storage!
        await existingPassword.save()

        return Response.json(
            { message: 'Password updated successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error updating password:', error.message)
        return Response.json(
            { error: 'Error updating password' },
            { status: 500 },
        )
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDB()
        const { id } = params

        const authHeader = req.headers.get('authorization')
        if (!authHeader)
            return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const token = authHeader.split(' ')[1]
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)

        const deletedPassword = await Password.findOneAndDelete({
            _id: id,
            userId,
        })
        if (!deletedPassword)
            return Response.json(
                { error: 'Password not found' },
                { status: 404 },
            )

        return Response.json(
            { message: 'Password deleted successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error deleting password:', error.message)
        return Response.json(
            { error: 'Error deleting password' },
            { status: 500 },
        )
    }
}

