import e from 'express'
import authorized from '../middleware/authorized.js'
import {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
} from '../controllers/ticketsController.js'
import notesRouter from './notesRouter.js'

const ticketsRouter = e.Router()

//Re-route the ticketsRouter into the notesRouter to gain access to the notes endpoint
ticketsRouter.use('/:ticketId/notes', notesRouter)

//This route prefix allows chaining of routes that hit the same endpoint
ticketsRouter
    .route('/')
    .get(authorized, getTickets)
    .post(authorized, createTicket)

//Handle the routes that involve an id parameter
ticketsRouter
    .route('/:id')
    .get(authorized, getTicket)
    .put(authorized, updateTicket)
    .delete(authorized, deleteTicket)

export default ticketsRouter
