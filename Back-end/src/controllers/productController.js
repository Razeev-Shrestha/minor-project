const db = require('../db/index.dbconfig');
const asyncHandler=require('express-async-handler')

exports.addnewProduct = asyncHandler(async (req, res) => {
      const newproductResults = await db.query(
         'INSERT INTO products (product_name,product_image,product_brand,product_category,product_description,rating,number_of_reviews,product_price,count_in_stock) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ',
         [
            req.body.name,
            req.body.image,
            req.body.brand,
            req.body.category,
            req.body.description,
            req.body.rating,
            req.body.numReviews,
            req.body.price,
            req.body.countInStock,
         ]
      );
      res.status(200).json({
          status:'success',
          message:newproductResults.rows
      })
});


exports.getallProducts=asyncHandler(async(req,res)=>{
    const allproducts=await db.query('SELECT * FROM products');
    res.send(allproducts);
})

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