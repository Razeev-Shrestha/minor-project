const nodemailer=require('nodemailer')
const env=require('dotenv')
const asyncHandler=require('express-async-handler')

env.config()

exports.sendMail=asyncHandler(async(req,res)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER,
            pass:process.env.PASSWORD
        }
    })

    const mailOptions={
        from:process.env.USER,
        to:req.body.email,
        subject:req.body.subject,
        text:req.body.description
    }

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log('error occurs',err)
        }else{
            console.log('email sent',data)
        }
    })

})