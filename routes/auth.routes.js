const express = require('express')
const authRouter = express.Router()
const { login } = require('../controllers/auth.controller')
// const { createAdmin } = require('../controllers/admin.controller')

authRouter.post('/login', login)
// authRouter.post('/admin', createAdmin)

module.exports = authRouter
