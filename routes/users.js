const express= require('express');
const router= express.Router();
const passport= require('passport');

const users_controller= require('../controllers/user_controller');

//handling requests
router.post('/create', users_controller.createUser);
router.get('/sign-in', users_controller.signIn);
router.get('/sign-up', users_controller.signUp);
router.get('/sign-out', users_controller.destroySession);

//to create session for user
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), users_controller.createSession);

//for sending email to user for resetting password
router.get('/ask-email', users_controller.getEmail);
router.post('/verify-otp/:id', users_controller.verify_otp);
router.post('/reset-password', users_controller.reset_password);
router.post('/save-password/:id', users_controller.save_password);              

//google authentication
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), users_controller.createSession);

module.exports= router;