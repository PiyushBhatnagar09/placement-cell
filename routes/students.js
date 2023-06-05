const express= require('express');
const router= express.Router();
const passport= require('passport');
const student_controller= require('../controllers/student_controller');

router.get('/add-student-page', passport.checkAuthentication, student_controller.addStudentPage);
router.post('/add-student', passport.checkAuthentication, student_controller.addStudent);
router.post('/:id', passport.checkAuthentication, student_controller.profile);
router.post('/csv/:id', passport.checkAuthentication, student_controller.downloadCSV);

module.exports= router;