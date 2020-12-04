const router=require('express').Router()

const {sendMail}=require('../controllers/emailcontrollers/emailcontroller')

router.post('/',sendMail)

module.exports=router