const bcrypt = require('bcrypt')
const db = require('../db/index.dbconfig')
const {
    usersignupvalidateSchema,
    usersigninvalidateSchema,
    userupdatevalidateSchema
} = require('../../middleware/validator.middleware')
const  asyncHandler = require('express-async-handler')
const tokenGenerator = require('../../utils/jwtGenerator')

// @description sign up for users
// @route  POST/api/users/signup
// @access public route

exports.newuserSignup = asyncHandler(async (req, res) => {
    const validateResult = await usersignupvalidateSchema.validateAsync(
        req.body
    )
    const searchDb = await db.query(`SELECT * FROM users where email_id=$1`, [
        validateResult.email_id,
    ])
    const hashedPassword = await bcrypt.hashSync(validateResult.password, 10)
    if (searchDb.rows.length > 0) {
        res.status(400)
        throw new Error('User Already Exists')
    }
    const newuserDbresults = await db.query(
        `INSERT INTO users(first_name,last_name,email_id,phone_number,password,date_of_birth) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * `,
        [
            validateResult.first_name,
            validateResult.last_name,
            validateResult.email_id,
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
            email: newuserDbresults.rows[0].email_id,
            jwtToken,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @description sign in for users
// @route  POST/api/users/signin
// @access private route

exports.userSignin = asyncHandler(async (req, res) => {
    const validateResult = await usersigninvalidateSchema.validateAsync(
        req.body
    )

    const userDbresults = await db.query('SELECT * FROM users WHERE email_id=$1', [
        validateResult.email_id,
    ])
    if (userDbresults.rows.length == 0) {
        res.status(401)
        throw new Error('User Not Found')
    }
    const decryptedPassword = await bcrypt.compareSync(
        validateResult.password,
        userDbresults.rows[0].password
    )
    if (!decryptedPassword) {
        res.status(401)
        throw new Error('Password Does not Match')
    }
    const jwtToken = tokenGenerator(userDbresults.rows[0].user_id)
    res.status(200).json({
        message: 'Logged in',
        Userid: userDbresults.rows[0].user_id,
        name: userDbresults.rows[0].first_name.concat(
            ' ',
            userDbresults.rows[0].last_name
        ),
        email: userDbresults.rows[0].email_id,
        jwtToken,
    })
})

// @description update info for users
// @route  PUT/api/users/userdetail
// @access private route

exports.userUpdate = asyncHandler(async (req, res) => {
    const validateResult = await userupdatevalidateSchema.validateAsync(
        req.body
    )
    const hashedPassword = bcrypt.hashSync(validateResult.password, 10)
    const searchDbresults = await db.query(
        `SELECT * FROM users WHERE user_id=$1`,
        [req.user]
    )
    const jwtToken = tokenGenerator(searchDbresults.rows[0].user_id)
    if (searchDbresults.rows.length == 0) {
        res.status(400)
        throw new Error('Unauthorized')
    } else {
        const dbresults = await db.query(
            'UPDATE users SET first_name=$1,last_name=$2,phone_number=$3,password=$4,date_of_birth=$5 WHERE user_id=$6 RETURNING * ',
            [
                validateResult.firstName,
                validateResult.lastName,
                validateResult.phonenumber,
                hashedPassword,
                validateResult.dateofBirth,
                req.user,
            ]
        )
        res.status(201).json({
            message: 'Successfully Updated',
            user_id: dbresults.rows[0].user_id,
            name: dbresults.rows[0].first_name.concat(
                ' ',
                dbresults.rows[0].last_name
            ),
            jwtToken,
        })
    }
})

// @description get details  for users
// @route  GET/api/users/userdetail
// @access private route

exports.userDetails = asyncHandler(async (req, res) => {
    const userdbresults = await db.query(
        'SELECT * FROM users WHERE user_id=$1',
        [req.user]
    )
    if (userdbresults.rows.length == 0) {
        res.status(400)
        throw new Error('User Not Found')
    } else {
        res.status(200).json({
            // data:userdbresults.rows[0]
            name: userdbresults.rows[0].first_name.concat(
                ' ',
                userdbresults.rows[0].last_name
            ),
            email: userdbresults.rows[0].email,
            first_name: userdbresults.rows[0].first_name,
            last_name: userdbresults.rows[0].last_name,
            phone_number: userdbresults.rows[0].phone_number,
            password: userdbresults.rows[0].password,
            date_of_birth: userdbresults.rows[0].date_of_birth,
        })
    }
})

// @description delete users
// @route  DELETE/api/users/userdetail
// @access private route

exports.userDelete = asyncHandler(async (req, res) => {
    await db.query('DELETE FROM users WHERE user_id=$1', [req.user]);
    res.status(204).json({
       status: 'success',
       message: 'deleted succesfully',
    });
})
