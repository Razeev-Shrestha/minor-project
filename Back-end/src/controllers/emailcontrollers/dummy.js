const nodemailer=require('nodemailer')
const {google}=require('googleapis')
const env=require('dotenv')
env.config()

const client_id=process.env.CLIENT_ID
const client_secret=process.env.CLIENT_SECRET
const redirect_uri=process.env.REDIRECT_URI
const refresh_token=process.env.REFRESH_TOKEN

const oAuth2Client=new google.auth.OAuth2(client_id,client_secret,redirect_uri)

oAuth2Client.setCredentials({refresh_token})

async function sendMail(){
    try{
            const accessToken=await oAuth2Client.getAccessToken()

    const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:process.env.USER,
            clientId:client_id,
            clientSecret:client_secret,
            refreshToken:refresh_token,
            accessToken:accessToken
        }
    })

    const mailOptions={
        from:'rajeev <stharazeev@gmail.com>',
        to:'rajeevstha02@gmail.com',
        subject:'hello',
        text:'hello gmail'
    }

    const result=await transport.sendMail(mailOptions)
    return result
    }catch(error){
        return error
    }

}

sendMail()
.then((result)=>console.log('email sent...',result))
.catch((error)=>console.log(error.message))


module.exports=sendMail
