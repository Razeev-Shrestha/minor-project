const router = require('express').Router()

const {
    getAllUsers,
    adminSignUp,
    adminSignIn,
    adminDelete,
    adminUpdate
} = require('../controllers/adminControllers')

const { verifyToken } = require('../../middleware/authorization.middleware')

router.post('/signin', adminSignIn)
router.post('/signup', adminSignUp)
router.get('/allusers', verifyToken, getAllUsers)
router
    .route('/admindetail/:user_id')
    .put(verifyToken, adminUpdate)
    .delete(verifyToken, adminDelete)

module.exports = router
