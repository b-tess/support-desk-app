import axios from 'axios'

const API_URL = '/api/tickets/'

async function createTicket(ticketData, token) {
    //Set up the token in the header same as in Postman
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

//Get all the tickets that a user has
async function getTickets(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//Get a single ticket in the user's collection
async function getTicket(ticketId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + ticketId, config)

    return response.data
}

//Close a ticket
async function closeTicket(ticketId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(
        API_URL + ticketId,
        { status: 'closed' },
        config
    )

    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
}

export default ticketService
