import { Ticket } from '../models/ticket.js'
import { Note } from '../models/note.js'

//Purpose: get a ticket's notes
//Access: private/user needs to be logged in
//Route: api/tickets/:ticketId/notes
export async function getNotes(req, res) {
    //Ensure that the logged in user owns the ticket to enable them to create/get its notes
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized to get notes.')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    if (notes.length > 0) {
        return res.send(notes)
    } else {
        return res.send('No notes available for this ticket.')
    }
}

//Purpose: Create ticket note
//Access: private/user needs to be logged in
//Route: api/tickets/:ticketId/notes
export async function addNote(req, res) {
    //Ensure that the logged in user owns the ticket to enable them to create/get its notes
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized to create a note.')
    }

    //Create a new note
    let newNote = new Note({
        user: req.user.id,
        ticket: req.params.ticketId,
        text: req.body.text,
    })

    newNote = await newNote.save()
    return res.send(newNote)
}
