const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'completed'],
        },
    },
    {
        timestamps: true,
    },
)

const Class = mongoose.model('Class', classSchema)

module.exports = Class
