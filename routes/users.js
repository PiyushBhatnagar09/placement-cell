const express= require('express');
const router= express.Router();

const users_controller= require('../controllers/user_controller');

//handling requests
// router.post('/create', users_controller.createUser);

module.exports= router;