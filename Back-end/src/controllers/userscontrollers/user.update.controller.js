const bcrypt = require('bcrypt')
const db = require('../../db/index.dbconfig')
const {
    userupdatevalidateSchema,
} = require('../../../middleware/validator.middleware')
const asyncHandler = require('express-async-handler')
const tokenGenerator = require('../../../utils/jwtGenerator')

// @description update details for users
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
