import mongoose from 'mongoose'

const PasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    website: { type: String, required: true },
    password: { type: String, required: true }, // Store encrypted password
})


export default mongoose.models.Password ||
    mongoose.model('Password', PasswordSchema)
