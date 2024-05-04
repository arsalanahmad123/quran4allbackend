const express = require('express')

const studentRouter = express.Router()

const verifyAdmin = require('../middlewares/verifyAdmin')

const {
    getAllStudents,
    getStudent,
    createStudent,
    editStudent,
    deleteStudent,
} = require('../controllers/students.controller')

studentRouter.get('/', verifyAdmin, getAllStudents)
studentRouter.get('/:id', getStudent)
studentRouter.post('/', createStudent)
studentRouter.put('/:id', editStudent)
studentRouter.delete('/:id', deleteStudent)

module.exports = studentRouter
