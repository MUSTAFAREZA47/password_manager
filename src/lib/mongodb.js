import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('Please add MONGODB_URI to .env file')

let cached = global.mongoose || { conn: null, promise: null }

export async function connectToDB() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                dbName: 'password_manager',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => mongoose)

        cached.conn = await cached.promise
        // console.log("Database connected")
    }
    return cached.conn
}
