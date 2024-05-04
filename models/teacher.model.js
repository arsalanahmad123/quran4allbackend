const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['teacher', 'student'],
            default: 'student',
        },
    },
    {
        timestamps: true,
    },
)

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher
