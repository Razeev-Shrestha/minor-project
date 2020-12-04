const jwt = require('jsonwebtoken')
const env = require('dotenv')

env.config()

function jwtGenerator(user_id) {
    const payload = {
        user: user_id,
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '20d' })
}

module.exports = jwtGenerator
