const Student = require('../models/student.model')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { studentSchema } = require('../validations/student.schema')

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .select('-password')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            students,
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const createStudent = async (req, res) => {
    try {
        const errors = studentSchema.validate(req.body, { abortEarly: false })

        if (errors.error) {
            throw createError(400, errors.error.details[0].message)
        }

        const {
            fullname,
            email,
            password,
            phone,
            address,
            username,
            country,
            whatsapp,
            skype,
            package,
        } = req.body
        const isExists = await Student.findOne({ email })
        if (isExists) {
            throw createError.Conflict(`${email} already exists`)
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const today = new Date()

        const student = await Student.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            address,
            username,
            country,
            whatsapp,
            skype,
            package,
            classTime: today,
        })

        return res.status(201).json({
            message: 'Student created successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const editStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id })

        if (!student) {
            throw createError.NotFound('Student not found')
        }

        const { password } = req.body
        password && (req.body.password = await bcrypt.hash(password, 10))

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
        )

        res.status(200).json({
            message: 'Student updated successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.find({ _id: req.params.id })

        if (!student) {
            throw createError.NotFound('Student not found')
        }

        await Student.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            message: 'Student deleted successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const getStudent = async (req, res) => {
    try {
        const student = await Student.find({ _id: req.params.id })
            .select('-password')
            .sort({ createdAt: -1 })

        if (!student) {
            throw createError.NotFound('Student not found')
        }

        return res.status(200).json({
            student,
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    editStudent,
    deleteStudent,
}
