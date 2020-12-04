const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const asyncHandler = require('express-async-handler')

exports.verifyToken = asyncHandler(async (req, res, next) => {
    let jwtToken
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try{
           jwtToken = req.headers.authorization.split(' ')[1];
           const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
           req.user = payload.user;
           next();
        } catch (error) {
           console.error(error)
           res.status(403)
           throw new Error('Not Authorized,Token Failed')
        }
    }

    if (!jwtToken) {
        res.status(403)
        throw new Error('unauthorized,Token not found')
    }
})
