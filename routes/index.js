const express= require('express');
const router= express.Router();
const passport= require('passport');

const home_controller= require('../controllers/home_controller');

router.use('/users', require('./users'));
// router.get('/', home_controller.home);

router.get('/', home_controller.home);

module.exports= router;