const express= require('express');
const router= express.Router();
const passport= require('passport');
const interview_controller= require('../controllers/interview_controller');

//handling requests
router.get('/add-interview-page', passport.checkAuthentication, interview_controller.addInterviewPage);
router.get('/delete/:id', passport.checkAuthentication, interview_controller.deleteInterview);
router.get('/external-jobs', passport.checkAuthentication, interview_controller.externalJobs);
router.post('/add-interview', passport.checkAuthentication, interview_controller.addInterview);
router.post('/:id/add-result', passport.checkAuthentication, interview_controller.addResult);

module.exports= router;