const User = require('../models/user');
const crypto=require('crypto');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"auth | sign up"
    })
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"auth | sign in"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_pwd){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Signed In successfully!')
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','Signed out successfully!')
    return res.redirect('/');
}

module.exports.changePwd=function(req,res)
{
    // console.log(req.user.password);
    if(req.body.new_pass!=req.body.confirm_pass)
    {
        req.flash('error','Password and confirm password should match!');
        return res.redirect('back');
    }
    if(req.user.password!=req.body.old_pass)
    {
        //not match password
        req.flash('error','Password is wrong!');
        return res.redirect('back');
    }
    else{
        let updatedStatus = req.user;
        updatedStatus.password=req.body.new_pass;
        User.findByIdAndUpdate(req.user._id, updatedStatus, function(err, updatedData){
            if(err){ console.log(err)}
             else { 
                 console.log("Password Updated!")
                }
        })
        req.flash('success','Password changed!');
        return res.redirect('back');

    }
}

module.exports.forgotPassword=function(req,res){
    return res.render('forgot_password',{
        title:'Gaggle | Forgot password'
    });
}
module.exports.reset=function(req,res){
    
    // console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user in reset password');return;}

        if(user){

            let new_pass=crypto.randomBytes(20).toString('hex');
            // console.log(new_pass);
            let updatedStatus = user;
            updatedStatus.password=new_pass;

        User.findByIdAndUpdate(user._id, updatedStatus, function(err, updatedData){
            if(err){ console.log(err)}
             else { 
                 console.log("New Password Generated!");
                 req.flash('success','New password sent to email');
                }
        })

        //send mail to user a new password
        resetMailers.newReset(user);

                return res.render('sendMail',{
                    title:'Gaggle | Reset password'
                });
        }else{
            // console.log('Invalid Email!');
            req.flash('error','Email not registered!')
            return res.redirect('back');
        }
    })
}