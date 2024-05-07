const express = require('express')

const classRouter = express.Router()
const {
    getTodayClasses,
    createClass,
    deleteClass,
    getClassesOfParticularEntity,
    changeClassStatus,
} = require('../controllers/class.controller')

const verifyAdmin = require('../middlewares/verifyAdmin')

classRouter.get('/', verifyAdmin, getTodayClasses)
classRouter.get('/:id', getClassesOfParticularEntity)
classRouter.put('/', changeClassStatus)
classRouter.post('/', verifyAdmin, createClass)
classRouter.delete('/:id', verifyAdmin, deleteClass)

module.exports = classRouter
