const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const mode = process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_OFFLINE : process.env.MONGO_URI;
        const conn = await mongoose.connect(mode);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB;