import mongoose from 'mongoose'

export default async function dbConnect() {
    try {
        mongoose.set('strictQuery', false)
        const db = process.env.MONGODB_ATLAS_CONNECTION_STRING
        await mongoose.connect(db)
        console.log('Connected to mongodb...'.cyan.underline)
    } catch (error) {
        console.log('Could not connect to mongodb'.red.underline.bold, error)
    }
}
