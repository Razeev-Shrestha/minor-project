const db = require('../../db/index.dbconfig');

exports.addnewProduct = async (req, res) => {
   try {
       console.log(req.body.name);
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
   } catch (error) {
      console.log(`${error.message}`);
      res.status(401).json({
         status: 'failure',
      });
   }
};
