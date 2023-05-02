import e from 'express'
import authorized from '../middleware/authorized.js'
import { getNotes, addNote } from '../controllers/notesController.js'

const notesRouter = e.Router({ mergeParams: true })

notesRouter.route('/').get(authorized, getNotes).post(authorized, addNote)

export default notesRouter

//mergeParams option is added because the notes endpoint is /api/tickets/:ticketId/notes
//Essentially the same as the tickets endpoints except the /:ticketId/notes at the end
//notesRouter is a child of the ticketsRouter
//Since they share the first part of the endpoint, the isn't a need to bring the notesRouter into server.js
//ticketsRouter re-routes any requests to /api/tickets/:ticketId/notes to the notesRouter
