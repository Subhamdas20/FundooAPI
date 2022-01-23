const nodemailer = require('nodemailer');
require('dotenv').config();


let nodeMailer  = (token)=>{
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailDetails = {
        from: process.env.EMAIL,
        to: req.email,
        subject: 'Forgot password',
        html: `<div>
        Hi,
        Here is the link to reset password  <a href="http://localhost:4000/resetpassword/${token}">click here</a></div>`
    };
    
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
    
            logger.error(err);
        } else {
            logger.info('Email sent successfully');
        }
    })

}
module.exports=nodeMailer;
