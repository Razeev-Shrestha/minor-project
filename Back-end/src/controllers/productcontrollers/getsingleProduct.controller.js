const db = require('../../db/index.dbconfig')
const asyncHandler = require('express-async-handler')

exports.getsingleProduct = asyncHandler(async (req, res) => {
    const product = await db.query(
        'SELECT * FROM products WHERE product_id=$1',
        [req.params.id]
    )
    if (product) {
        res.send(product.rows)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
