const nodemailer=require('../config/nodemailer');

//this is another way of exporting
exports.newLogin=(user)=>{
    // console.log('Inside newComment mailer',user);
    nodemailer.transporter.sendMail({
        from:'gaggle.com',
        to:user.email,
        subject:"New Login Detected!",
        html:`<p>Hey ${user.name},<br>You have just logged in to your account!<br> <br>If this is not you kindly reset your password!<br>Thanks</p>`
    },(err,info)=>{
        if(err){
        console.log('error in sending mail',err);
        return;
    }

    console.log('Message sent',info);
    return;
    })
}