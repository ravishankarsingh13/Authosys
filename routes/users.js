const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);
router.post('/create',userController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

router.post('/changePwd',userController.changePwd);
router.get('/forgot-password',userController.forgotPassword);
router.get('/sign-out', userController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);
router.post('/reset-password',userController.reset);

module.exports = router;