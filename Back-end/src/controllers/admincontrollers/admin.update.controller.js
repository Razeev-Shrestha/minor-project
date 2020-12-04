const bcrypt=require('bcrypt');
const db=require('../../db/index.dbconfig');
const jwtGenerator=require('../../../utils/jwtGenerator');
const {adminupdatevalidateSchema}=require('../../../middleware/validator.middleware');

exports.adminUpdate=async(req,res)=>{
    try {
        const validateResult=await adminupdatevalidateSchema.validateAsync(req.body);
        const saltRounds=10;
        const salt=await bcrypt.genSaltSync(saltRounds);
        const hashedPassword=bcrypt.hashSync(validateResult.password,salt);
        const dbresults=await db.query('UPDATE admins SET first_name=$1,last_name=$2,user_name=$3,email_id=$4,phone_number=$5,password=$6,date_of_birth=$7 WHERE user_id=$8 RETURNING * ',
        [
            validateResult.first_name,
            validateResult.last_name,
            validateResult.user_name,
            validateResult.email_id,
            validateResult.phone_number,
            hashedPassword,
            validateResult.date_of_birth,
            req.user
        ]);
        const jwtToken=jwtGenerator(dbresults.rows[0].user_id);
        res.status(201).json({
            status:'success',
            jwtToken,
            results:dbresults.rows.length,
            data:{
                user:dbresults.rows
            } 
        });
    } catch (err) {
        console.log(err);
    }
        
}
