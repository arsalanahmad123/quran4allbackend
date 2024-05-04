const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({ admin })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = { createAdmin }
