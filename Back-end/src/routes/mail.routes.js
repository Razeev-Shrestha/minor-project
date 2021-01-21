const router=require('express').Router()

const {sendMail}=require('../controllers/emailcontroller')

router.post('/',sendMail)

module.exports=router