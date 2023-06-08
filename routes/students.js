const express= require('express');
const router= express.Router();
const passport= require('passport');
const student_controller= require('../controllers/student_controller');

//handiing requests
router.get('/csv', student_controller.downloadCSV);
router.get('/add-student-page', passport.checkAuthentication, student_controller.addStudentPage);
router.get('/:id', passport.checkAuthentication, student_controller.profile);
router.get('/delete/:id', passport.checkAuthentication, student_controller.deleteStudent);
router.post('/add-student', passport.checkAuthentication, student_controller.addStudent);
router.post('/update/:id', passport.checkAuthentication, student_controller.update);

module.exports= router;