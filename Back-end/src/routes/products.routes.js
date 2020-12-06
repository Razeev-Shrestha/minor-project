const router = require('express').Router()

const {
    addnewProduct,
    getallProducts,
    getsingleProduct
} = require('../controllers/productController')

router.get('/', getallProducts)

router.get('/:id', getsingleProduct)

router.post('/addproduct', addnewProduct)

module.exports = router
