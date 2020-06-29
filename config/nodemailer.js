const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


// protocol defined for mailing also added auth and used to send mails
// change your email id and password in this and mailer will use them
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'',              // put your email here
        pass:''                      //put your password here
        
    }
});

// used for rendering templates send to browser
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err);return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}