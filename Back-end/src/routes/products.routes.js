const router = require('express').Router()

const {
    getallProducts,
} = require('../controllers/productcontrollers/getallProducts.controller')
const {
    addnewProduct,
} = require('../controllers/productcontrollers/addProduct.controller')
const {
    getsingleProduct,
} = require('../controllers/productcontrollers/getsingleProduct.controller')

router.get('/', getallProducts)

router.get('/:id', getsingleProduct)

router.post('/addproduct', addnewProduct)

module.exports = router
