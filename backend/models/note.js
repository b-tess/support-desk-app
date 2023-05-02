import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        ticket: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Ticket',
        },
        text: {
            type: String,
            required: [true, 'Please enter some text'],
        },
        isStaff: {
            type: Boolean,
            default: false,
        },
        staffId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const Note = mongoose.model('Note', noteSchema)
