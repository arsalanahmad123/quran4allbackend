const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        whatsapp: {
            type: Number,
            required: true,
        },
        skype: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
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
        package: {
            type: String,
            required: true,
        },
        classTime: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
