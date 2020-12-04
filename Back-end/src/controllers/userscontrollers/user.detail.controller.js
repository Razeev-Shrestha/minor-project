const db = require('../../db/index.dbconfig')
const asyncHandler = require('express-async-handler')

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
