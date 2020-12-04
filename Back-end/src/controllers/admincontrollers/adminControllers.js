const db = require('../../db/index.dbconfig')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../../utils/jwtGenerator')
const {
    adminsignupvalidateSchema,
    adminsigninvalidateSchema,
} = require('../../../middleware/validator.middleware')

exports.getAllUsers = asyncHandler(async (req, res) => {
    const results = await db.query('SELECT * FROM users')
    res.status(200).json({
        data: results.rows,
    })
})

exports.adminSignUp = asyncHandler(async (req, res) => {
    const validateResult = await adminsignupvalidateSchema.validateAsync(
        req.body
    )
    const searchdb = await db.query('SELECT * FROM admins WHERE email=$1', [
        validateResult.email,
    ])
    if (searchdb.rows.length > 0) {
        res.status(401)
        throw new Error('User Already Exists')
    } else {
        const hashedPassword = await bcrypt.hashSync(
            validateResult.password,
            10
        )
        const newadminDbresults = await db.query(
            `INSERT INTO admins(name,email,password) VALUES ($1,$2,$3) RETURNING * `,
            [validateResult.name, validateResult.email, hashedPassword]
        )
        res.status(201).json({
            data: newadminDbresults.rows,
        })
    }
})

exports.adminSignIn = asyncHandler(async (req, res) => {
    const validateResult = await adminsigninvalidateSchema.validateAsync(
        req.body
    )
    const adminDbresults = await db.query(
        'SELECT * FROM admins WHERE email=$1',
        [validateResult.email]
    )
    if (adminDbresults.rows.length === 0) {
        res.status(401)
        throw new Error('Email not Found')
    }
    const decryptedPassword = await bcrypt.compareSync(
        validateResult.password,
        adminDbresults.rows[0].password
    )
    if (!decryptedPassword) {
        res.status(401)
        throw new Error('Password not Matched')
    }
    const jwtToken = jwtGenerator(adminDbresults.rows[0].user_id)
    res.status(200).json({
        message: 'logged in ',
        name: adminDbresults.rows[0].name,
        jwtToken,
    })
})
