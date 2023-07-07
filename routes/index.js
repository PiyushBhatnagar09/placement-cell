const express= require('express');
const router= express.Router();

const users_controller= require('../controllers/user_controller');

//made separate for handling user specific requests
router.use('/users', require('./users'));
router.use('/registration', require('./registration'));
router.get('/', users_controller.home);
module.exports= router;