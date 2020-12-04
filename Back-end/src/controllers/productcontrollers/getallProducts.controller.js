const db=require('../../db/index.dbconfig');

exports.getallProducts=async(req,res)=>{
    const allproducts=await db.query('SELECT * FROM products');
    res.send(allproducts);
}