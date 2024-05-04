const express = require('express')
const teacherRouter = express.Router()

const verifyAdmin = require('../middlewares/verifyAdmin')

const {
    getAllTeachers,
    getTeacher,
    createTeacher,
    editTeacher,
    deleteTeacher,
} = require('../controllers/teachers.controller')

teacherRouter.get('/', verifyAdmin, getAllTeachers)
teacherRouter.get('/:id', getTeacher)
teacherRouter.post('/', createTeacher)
teacherRouter.put('/:id', editTeacher)
teacherRouter.delete('/:id', deleteTeacher)

module.exports = teacherRouter
