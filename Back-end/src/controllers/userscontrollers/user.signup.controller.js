const bcrypt = require('bcrypt')
const db = require('../../db/index.dbconfig')
const {
    usersignupvalidateSchema,
} = require('../../../middleware/validator.middleware')
const asyncHandler = require('express-async-handler')
const tokenGenerator = require('../../../utils/jwtGenerator')

// @description sign up for users
// @route  POST/api/users/signup
// @access public route

exports.newuserSignup = asyncHandler(async (req, res) => {
    const validateResult = await usersignupvalidateSchema.validateAsync(
        req.body
    )
    const searchDb = await db.query(`SELECT * FROM users where email=$1`, [
        validateResult.email,
    ])
    const hashedPassword = await bcrypt.hashSync(validateResult.password, 10)
    if (searchDb.rows.length > 0) {
        res.status(400)
        throw new Error('User Already Exists')
    }
    const newuserDbresults = await db.query(
        `INSERT INTO users(first_name,last_name,email,phone_number,password,date_of_birth) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * `,
        [
            validateResult.first_name,
            validateResult.last_name,
            validateResult.email,
            validateResult.phone_number,
            hashedPassword,
            validateResult.date_of_birth,
        ]
    )
    const jwtToken = tokenGenerator(newuserDbresults.rows[0].user_id)
    if (newuserDbresults.rows.length > 0) {
        res.status(201).json({
            message: 'user created successfully',
            Userid: newuserDbresults.rows[0].user_id,
            name: newuserDbresults.rows[0].first_name.concat(
                ' ',
                newuserDbresults.rows[0].last_name
            ),
            email: newuserDbresults.rows[0].email,
            jwtToken,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})
