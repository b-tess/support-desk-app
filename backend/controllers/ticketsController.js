import { Ticket, validateTicket } from '../models/ticket.js'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

//Purpose: get a user's tickets
//Access: private/user needs to be logged in
export async function getTickets(req, res) {
    //Get all the user's tickets
    const tickets = await Ticket.find({ user: req.user._id }).sort({
        createdAt: -1,
    })

    //If this user doesn't have any tickets, return an appropriate response
    if (tickets.length === 0) {
        return res.send('The current user has no tickets.')
    }

    return res.send(tickets)
}

//Purpose: get a single ticket
//Access: private/user needs to be logged in & they can only see their own ticket
export async function getTicket(req, res) {
    //Check if the provided id is a valid one before querying the db
    if (ObjectId.isValid(req.params.id)) {
        const ticket = await Ticket.findById(req.params.id)

        //Check if a ticket with the provided id exists
        if (!ticket) {
            res.status(404)
            throw new Error('Ticket not found.')
        }

        //If the ticket exists, confirm that it belongs to the currently logged in user
        if (ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not Authorized.')
        }

        //Return the ticket to the user
        return res.send(ticket)
    }

    res.status(400)
    throw new Error('Invalid Id.')
}

//Purpose: create a ticket
//Access: private/user needs to be logged in
export async function createTicket(req, res) {
    //Client side validation of the user's input
    const { error } = validateTicket(req.body)
    if (error) {
        let messages = []
        error.details.forEach((detail) => messages.push(detail.message))
        return res.status(400).send(messages.join('\n'))
    }

    //Destructure the request body
    const { product, description } = req.body

    //Additional server side validation of the user's input
    if (!product || !description) {
        res.status(400)
        throw new Error(
            'Please provide a product and a short description of the issue.'
        )
    }

    //Create a new ticket if the user's input passes validation
    let newTicket = new Ticket({
        user: req.user.id,
        product,
        description,
    })

    //Save the new ticket to the appropriate user
    newTicket = await newTicket.save()
    res.status(201).send(newTicket)
}

//Purpose: update a ticket
//Access: private/user needs to be logged in & they can only update their own ticket
export async function updateTicket(req, res) {
    //Check if the provided id is a valid one before querying the db
    if (ObjectId.isValid(req.params.id)) {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        //Check if a ticket with the provided id exists
        if (!updatedTicket) {
            res.status(404)
            throw new Error('Ticket not found.')
        }

        //If the ticket exists, confirm that it belongs to the currently logged in user
        if (updatedTicket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not Authorized.')
        }

        //Return the updated ticket to the user
        return res.send(updatedTicket)
    }

    res.status(400)
    throw new Error('Invalid Id.')
}

//Purpose: delete a ticket
//Access: private/user needs to be logged in & they can only delete their own ticket
export async function deleteTicket(req, res) {
    //Check if the provided id is a valid one before querying the db
    if (ObjectId.isValid(req.params.id)) {
        let deleteTicket = await Ticket.findById(req.params.id)

        //Check if a ticket with the provided id exists
        if (!deleteTicket) {
            res.status(404)
            throw new Error('Ticket not found.')
        }

        //If the ticket exists, confirm that it belongs to the currently logged in user
        if (deleteTicket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not Authorized.')
        }

        //Delete the ticket from the db & return the deleted ticket to the user
        deleteTicket = await Ticket.findOneAndDelete({ _id: deleteTicket._id })
        return res.send(deleteTicket)
    }

    res.status(400)
    throw new Error('Invalid Id.')
}
