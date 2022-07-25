import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ticket'

const headersOpts = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const createTicket = async (tickets, token) => {
    const config = headersOpts(token)
    const response = await axios.post(API_URL, tickets, config)
    return response.data
}

const getTickets = async (token) => {
    const config = headersOpts(token);
    const response = await axios.get(API_URL, config)
    return response.data
}

const getTicket = async (ticketId, token) => {
    const config = headersOpts(token);
    const url = `${API_URL}/${ticketId}`
    const response = await axios.get(url, config)
    return response.data
}

const ticketServices = {
    createTicket,
    getTickets,
    getTicket
}

export default ticketServices