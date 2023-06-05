const express= require('express');
const router= express.Router();
const passport= require('passport');
const interview_controller= require('../controllers/interview_controller');

router.get('/add-interview-page', passport.checkAuthentication, interview_controller.addInterviewPage);
router.post('/add-interview', passport.checkAuthentication, interview_controller.addInterview);

module.exports= router;