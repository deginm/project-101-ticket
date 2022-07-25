const express = require('express');
const router = express.Router();
const { getTickets, addTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')
const { protectedRoutes } = require('../middleware/authMiddleware');

router.route('/').get(protectedRoutes, getTickets).post(protectedRoutes, addTicket);
router.route('/:id').get(protectedRoutes, getTicket).delete(protectedRoutes, deleteTicket).put(protectedRoutes, updateTicket);
module.exports = router