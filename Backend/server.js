const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const colors = require('colors')
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const ticketRoute = require('./routes/ticketRoutes');
const { errorHandler } = require('./middleware/errorHandler');


const PORT = process.env.PORT || 8000

// connect to datadase
connectDB()

// middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// routers
app.use('/api/user', userRoutes)
app.use('/api/ticket', ticketRoute)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})