import mongoose from 'mongoose'
import Joi from 'joi'

const ticketSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: String,
            required: [true, 'Please select a product'],
            enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
        },
        description: {
            type: String,
            required: [true, 'Please enter a description of the issue'],
        },
        status: {
            type: String,
            required: true,
            enum: ['new', 'open', 'closed'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
)

export const Ticket = mongoose.model('Ticket', ticketSchema)

export function validateTicket(ticketInfo) {
    const schema = Joi.object({
        product: Joi.string().required(),
        description: Joi.string().required(),
    })

    return schema.validate(ticketInfo, { abortEarly: false })
}
