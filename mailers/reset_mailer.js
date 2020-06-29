const nodeMailer=require('../config/nodemailer');


//this is another way of exporting
exports.newReset=(user)=>{
    // console.log('Inside newComment mailer',comment);
    // let htmlString=nodemailer.renderTemplate({comment:comment},'./comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'admin.gaggle.com',
        to:user.email,
        subject:"New Password generated!",
        html:`<p>Your password is reset and the new password is : <b>${user.password}<b></p>`
    },(err,info)=>{
        if(err){
        console.log('error in sending mail',err);
        return;
    }

    console.log('Message sent',info);
    return;
    })
}