const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
const cors = require('cors')

app.use(cors())

// Routes
const authRouter = require('./routes/auth.routes')
const teacherRouter = require('./routes/teacher.routes')
const studentRouter = require('./routes/student.routes')
const classRouter = require('./routes/class.routes')

app.use('/api/auth', authRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/student', studentRouter)
app.use('/api/class', classRouter)

// Start Server

const PORT = process.env.PORT || 5000

try {
    connectDB()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
} catch (error) {
    console.log(error)
}
