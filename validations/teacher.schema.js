const Joi = require('joi')

const teacherSchema = Joi.object({
    fullname: Joi.string().required().messages({
        'string.base': 'Fullname must be a string',
        'any.required': 'Fullname is required',
    }),
    email: Joi.string().required().messages({
        'string.base': 'Email must be a string',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().min(6).messages({
        'string.base': 'Password must be a string',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
    phone: Joi.number().required().messages({
        'string.base': 'Phone must be a number',
        'any.required': 'Phone is required',
    }),
    address: Joi.string().required().messages({
        'string.base': 'Address must be a string',
        'any.required': 'Address is required',
    }),
    role: Joi.string().required().messages({
        'string.base': 'Role must be a string',
        'any.required': 'Role is required',
    }),
})

module.exports = { teacherSchema }
