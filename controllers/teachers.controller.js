const Teacher = require('../models/teacher.model')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { teacherSchema } = require('../validations/teacher.schema')

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
            .select('-password')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            teachers,
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const getTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.find({ _id: req.params.id })
            .select('-password')
            .sort({ createdAt: -1 })

        if (!teacher) {
            throw createError.NotFound('Teacher not found')
        }

        return res.status(200).json({
            teacher,
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const createTeacher = async (req, res) => {
    try {
        const errors = teacherSchema.validate(req.body, { abortEarly: false })

        if (errors.error) {
            throw createError(400, errors.error.details[0].message)
        }

        const { fullname, email, password, phone, address, role } = req.body

        const isExists = await Teacher.findOne({ email })
        if (isExists) {
            throw createError.Conflict(`${email} already exists`)
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const teacher = await Teacher.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
        })

        return res.status(201).json({
            message: 'Teacher created successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const editTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.params.id })

        if (!teacher) {
            throw createError.NotFound('Teacher not found')
        }

        const { password } = req.body
        password && (req.body.password = await bcrypt.hash(password, 10))

        const updatedTeacher = await Teacher.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
        )

        res.status(200).json({
            message: 'Teacher updated successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.find({ _id: req.params.id })

        if (!teacher) {
            throw createError.NotFound('Teacher not found')
        }

        await Teacher.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            message: 'Teacher deleted successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

module.exports = {
    getAllTeachers,
    getTeacher,
    createTeacher,
    editTeacher,
    deleteTeacher,
}
