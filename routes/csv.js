const express= require('express');
const router= express.Router();
const passport= require('passport');
const student_controller= require('../controllers/student_controller');

router.post('/:id', passport.checkAuthentication, student_controller.profile);

module.exports= router;