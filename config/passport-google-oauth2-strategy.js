const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// used for generating random strings
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy to google login
passport.use(new googleStrategy({
        clientID: "431808126302-vrdceflejpt0qt1fg6q8g8aklh8kn8hb.apps.googleusercontent.com",
        clientSecret: "CSa_1olOTFu763GFMkS12X-V",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done)
    {
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google passport strategy',err);return;}
    
            // console.log(profile);
    
            if(user)
            {
                //if found,set this user as req.user
                return done(null,user);
            }
            else{
                //if not found,create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating google-auth-strategy',err);return;}
    
                    return done(null,user);
                })
            }
        })
    }
))
    
module.exports=passport; 