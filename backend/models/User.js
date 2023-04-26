import mongoose from 'mongoose'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

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

//Create a class instance method for generating a token related to the user login details
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRETKEY, {
        expiresIn: '7d',
    })
    return token
}

export const User = mongoose.model('User', userSchema)

export function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    return schema.validate(user, { abortEarly: false })
}

export function validateEmailAndPassword(loginDetails) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    return schema.validate(loginDetails, { abortEarly: false })
}
