const router = require('express').Router()

const {
    newuserSignup,
    userDelete,
    userDetails,
    userSignin,
    userUpdate
} = require('../controllers/userController')

const { verifyToken } = require('../../middleware/authorization.middleware')

router.post('/signin', userSignin)

router
    .route('/userdetail/')
    .get(verifyToken, userDetails)
    .put(verifyToken, userUpdate)
    .delete(verifyToken, userDelete)

router.post('/signup', newuserSignup)


module.exports = router
