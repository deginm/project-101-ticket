const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Ticket = require('../models/ticketModal');

//@desc     get all tickets
//@route    get /api/ticket
//@access   Private
const getTickets = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket = await Ticket.find({ user: req.user.id })
    res.status(200).json(ticket)
});

//@desc     add ticket
//@route    POST /api/ticket
//@access   Private
const addTicket = asyncHandler(async (req, res) => {
    const { product, discription } = req.body
    // validate req body
    if(!product || !discription){ 
        res.status(400);
        throw new Error('Please provider app paremeters')
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('user not found');
    }
    
    const ticket = await Ticket.create({
        user: req.user.id,
        discription,
        product,
        status: 'new'
    })
    res.status(201).json(ticket)
})

//@desc     get single ticket
//@route    get /api/ticket:id
//@access   Private
const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authroized')
    }
    res.status(201).json(ticket)
});

//@desc     delete ticket
//@route    delete /api/ticket:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authroized')
    }
    await ticket.remove()
    res.status(201).json({ success: true })
});

//@desc     Updata ticket
//@route    PUT /api/ticket:id
//@access   Private
const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authroized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json(updatedTicket)
});

module.exports = {
    getTickets,
    addTicket,
    getTicket,
    deleteTicket,
    updateTicket
}