const router = require('express').Router()

const {
    newuserSignup,
} = require('../controllers/userscontrollers/user.signup.controller')
const {
    userDelete,
} = require('../controllers/userscontrollers/user.delete.controller')
const {
    userUpdate,
} = require('../controllers/userscontrollers/user.update.controller')
const {
    userDetails,
} = require('../controllers/userscontrollers/user.detail.controller')
const {
    userSignin,
} = require('../controllers/userscontrollers/user.signin.controller')

const { verifyToken } = require('../../middleware/authorization.middleware')

router.post('/signin', userSignin)

router
    .route('/userdetail/')
    .get(verifyToken, userDetails)
    .put(verifyToken, userUpdate)

router.post('/signup', newuserSignup)

router.delete('/userdetail/', verifyToken, userDelete)

module.exports = router
