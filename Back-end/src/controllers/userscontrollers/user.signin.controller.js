const db = require('../../db/index.dbconfig')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwtGenerator = require('../../../utils/jwtGenerator')
const {
    usersigninvalidateSchema,
} = require('../../../middleware/validator.middleware')

// @description sign in for users
// @route  POST/api/users/signin
// @access private route

exports.userSignin = asyncHandler(async (req, res) => {
    const validateResult = await usersigninvalidateSchema.validateAsync(
        req.body
    )

    const userDbresults = await db.query('SELECT * FROM users WHERE email=$1', [
        validateResult.email,
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
    const jwtToken = jwtGenerator(userDbresults.rows[0].user_id)
    res.status(200).json({
        message: 'Logged in',
        Userid: userDbresults.rows[0].user_id,
        name: userDbresults.rows[0].first_name.concat(
            ' ',
            userDbresults.rows[0].last_name
        ),
        email: userDbresults.rows[0].email,
        jwtToken,
    })
})
