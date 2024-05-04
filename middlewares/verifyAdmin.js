const Admin = require('../models/admin.model')
const createError = require('http-errors')
const { verifyToken } = require('../utils/generateToken')

const verifyAdmin = async (req, res, next) => {
    try {
        const id = req.headers.id

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw createError(401, 'Unauthorized')
        }

        const decoded = verifyToken(token)

        if (!decoded) {
            throw createError(401, 'Unauthorized')
        }

        const admin = await Admin.findById(id)
        if (!admin) {
            throw createError(401, 'Unauthorized')
        }
        next()
    } catch (error) {
        return res.status(error.status || 500).json({
            msg: error.message,
        })
    }
}

module.exports = verifyAdmin
