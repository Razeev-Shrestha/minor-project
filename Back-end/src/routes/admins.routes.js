const router = require('express').Router()

const {
    adminDelete,
} = require('../controllers/admincontrollers/admin.delete.controller')
const {
    adminUpdate,
} = require('../controllers/admincontrollers/admin.update.controller')
const {
    adminDetails,
} = require('../controllers/admincontrollers/admin.detail.controller')

const {
    getAllUsers,
    adminSignUp,
    adminSignIn,
} = require('../controllers/admincontrollers/adminControllers')

const { verifyToken } = require('../../middleware/authorization.middleware')

router.post('/signin', adminSignIn)
router.post('/signup', adminSignUp)
router.get('/allusers', verifyToken, getAllUsers)

router.get('/admindetail/:user_id', verifyToken, adminDetails)

router.put('/admindetail/:user_id', verifyToken, adminUpdate)

router.delete('/admindetail/:user_id', verifyToken, adminDelete)

module.exports = router
