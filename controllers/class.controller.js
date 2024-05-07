const Class = require('../models/class.model')
const Teacher = require('../models/teacher.model')
const Student = require('../models/student.model')
const createError = require('http-errors')

const getTodayClasses = async (req, res) => {
    try {
        const currentDate = new Date().toISOString()

        const currentDateOnly = currentDate.split('T')[0]

        const classes = await Class.find({
            time: { $gte: new Date(currentDateOnly) },
        })
            .populate('teacher')
            .populate('student')

        return res.status(200).json({
            classes,
        })
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const getClassesOfParticularEntity = async (req, res) => {
    try {
        const userId = req.params.id // Assuming the id is of the logged-in user

        // Check if the user is a teacher
        const teacher = await Teacher.findById(userId)
        if (teacher) {
            const classes = await Class.find({
                teacher: userId,
                time: { $gte: new Date().setHours(0, 0, 0, 0) }, // Fetch classes from today
            })
                .populate('teacher')
                .sort({ createdAt: -1 })

            return res.status(200).json({ classes })
        }

        // Check if the user is a student
        const student = await Student.findById(userId)
        if (student) {
            const classes = await Class.find({
                student: userId,
                time: { $gte: new Date().setHours(0, 0, 0, 0) }, // Fetch classes from today
            })
                .populate('teacher')
                .sort({ createdAt: -1 })

            return res.status(200).json({ classes })
        }

        // If the user is neither a teacher nor a student
        return res.status(400).json({ msg: 'User not found or invalid role' })
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).json({ msg: error.message })
    }
}

const createClass = async (req, res) => {
    try {
        const { teacher_id, student_id, time, link } = req.body

        // Check if there is already a class at the specified time for the teacher
        const existingTeacherClass = await Class.findOne({
            teacher: teacher_id,
            time: time,
        })

        if (existingTeacherClass) {
            throw createError(400, 'Teacher already has a class at this time')
        }

        // Check if there is already a class at the specified time for the student
        const existingStudentClass = await Class.findOne({
            student: student_id,
            time: time,
        })

        if (existingStudentClass) {
            throw createError(400, 'Student already has a class at this time')
        }

        // Proceed with the creation of the class if checks pass
        const teacher = await Teacher.findOne({ _id: teacher_id })
        const student = await Student.findOne({ _id: student_id })
        const studentCountry = student.country

        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        const todayEnd = new Date()
        todayEnd.setHours(23, 59, 59, 999)

        const classesCount = await Class.countDocuments({
            teacher: teacher_id,
            country: studentCountry,
            time: {
                $gte: todayStart,
                $lt: todayEnd,
            },
        })

        if (classesCount >= 10) {
            throw createError(400, 'Teacher can only create 10 classes per day')
        }

        const newClass = await Class.create({
            teacher: teacher_id,
            student: student_id,
            time,
            link,
            country: studentCountry,
        })

        return res.status(201).json({
            message: 'Class created successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const deleteClass = async (req, res) => {
    try {
        const classId = req.params.id

        const classExists = await Class.findOne({ _id: classId })

        if (!classExists) {
            throw createError(404, 'Class not found')
        }

        await Class.deleteOne({ _id: classId })

        return res.status(200).json({
            message: 'Class deleted successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

const changeClassStatus = async (req, res) => {
    try {
        const { class_id, teacher_id } = req.body
        const classFound = await Class.findById(class_id)

        if (!classFound) {
            throw createError(404, 'Class not found')
        }

        if (classFound.teacher != teacher_id) {
            throw createError(
                400,
                'You are not authorized to perform this action',
            )
        }

        const updatedClass = await Class.findByIdAndUpdate(class_id, {
            $set: {
                status: 'completed',
            },
        })

        return res.status(200).json({
            message: 'Class status updated successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

module.exports = {
    getTodayClasses,
    createClass,
    deleteClass,
    getClassesOfParticularEntity,
    changeClassStatus,
}
