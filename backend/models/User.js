import mongoose from 'mongoose'
import Joi from 'joi'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add your name'],
        },
        email: {
            type: String,
            required: [true, 'Please add your email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add your password'],
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)

export function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    return schema.validate(user, { abortEarly: false })
}
