const Admin = require('../models/admin.model')
const Teacher = require('../models/teacher.model')
const Student = require('../models/student.model')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

const { generateToken } = require('../utils/generateToken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw createError(400, 'Please provide email and password')
        }

        let user = await Admin.findOne({ email })

        if (!user) {
            user =
                (await Teacher.findOne({ email })) ||
                (await Student.findOne({ email }))
        }

        if (!user) {
            throw createError(400, 'Invalid email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw createError(400, 'Invalid email or password')
        }

        const token = generateToken(user._id)

        const userWithoutPassword = { ...user.toObject(), password: undefined }

        res.status(200).json({ user: userWithoutPassword, token })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).json({ error: error.message })
    }
}

const getTotalStudentsAndTeachers = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments()
        const totalTeachers = await Teacher.countDocuments()

        return res.status(200).json({
            totalStudents,
            totalTeachers,
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

module.exports = { login, getTotalStudentsAndTeachers }
