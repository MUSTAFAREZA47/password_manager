import { connectToDB } from '@/lib/mongodb'
import User from '@/models/user.model'
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        await connectToDB()

        const { username, email, password } = await req.json()
        // console.log(username, email, password)

        if (!username || !email || !password) {
            return Response.json(
                { error: 'All field are required.' },
                { status: 500 },
            )
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return Response.json({
                error: `User with this ${email} already exists.`,
            })
        }
        
        

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        // console.log("newUser", newUser)

        return Response.json(
            { newUser },
            { message: 'User registered successfully' },
            { status: 201 },
        )
    } catch (error) {
        return Response.json(
            { error: 'Error in registering user.' },
            { status: 500 },
        )
    }
}
