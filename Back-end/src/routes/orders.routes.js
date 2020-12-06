const router = require('express').Router()

const {
    addOrderItems,
    getOrderItemsById,
    updateOrderToPaid,
    ordersOfLoggedInUser
} = require('../controllers/orderController')
const { verifyToken } = require('../../middleware/authorization.middleware')

router.post('/', verifyToken, addOrderItems)
router.get('/myorders', verifyToken, ordersOfLoggedInUser)
router.get('/:id', verifyToken, getOrderItemsById)
router.put('/:id/pay', verifyToken, updateOrderToPaid)

module.exports = router
