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

const ticketService = {
    createTicket,
}

export default ticketService
