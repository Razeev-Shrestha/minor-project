const joi = require('joi')

exports.usersignupvalidateSchema = joi.object({
    first_name: joi.string().min(3).required(),
    last_name: joi.string().min(3).required(),
    email: joi.string().min(4).email().required(),
    phone_number: joi.number().min(5).required(),
    password: joi.string().min(6).required(),
    date_of_birth: joi.date().required(),
})

exports.usersigninvalidateSchema = joi.object({
    email: joi.string().min(4).email().required(),
    password: joi.string().required(),
})

exports.userupdatevalidateSchema = joi.object({
    firstName: joi.string().min(3),
    lastName: joi.string().min(3),
    phonenumber: joi.number().min(5),
    password: joi.string().min(6).required(),
    dateofBirth: joi.date(),
})

exports.adminsignupvalidateSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(4).email().required(),
    password: joi.string().min(8).required(),
})

exports.adminsigninvalidateSchema = joi.object({
    email: joi.string().min(4).email().required(),
    password: joi.string().required(),
})

exports.adminupdatevalidateSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(4).email().required(),
    password: joi.string().min(8).required(),
})
