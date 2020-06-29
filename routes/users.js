const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

// the profile page
router.get('/profile',userController.profile);

//sign up
router.get('/sign-up',userController.signup);
//sign in
router.get('/sign-in',userController.signin);
// for create
router.post('/create',userController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);
//for change password
router.post('/changePwd',userController.changePwd);
//forgot password
router.get('/forgot-password',userController.forgotPassword);
//sign out
router.get('/sign-out', userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);
//reset password
router.post('/reset-password',userController.reset);

module.exports = router;