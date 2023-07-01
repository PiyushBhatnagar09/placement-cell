const express= require('express');
const router= express.Router();

const users_controller= require('../controllers/user_controller');

//made separate for handling user specific requests
router.use('/users', require('./users'));
router.use('/aadhaar', require('./aadhaar'));
router.get('/', users_controller.findAbha);
module.exports= router;