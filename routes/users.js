const express= require('express');
const router= express.Router();

const users_controller= require('../controllers/user_controller');

//handling requests
// router.post('/create', users_controller.createUser);

router.post('/createAbha', users_controller.createAbha);
router.post('/loginAbha', users_controller.loginAbha);

module.exports= router;