const mongoose = require('mongoose')
const config = require('dotenv')
config.config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        if (conn.connection.readyState == 1) {
            console.log('MongoDB connected')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
