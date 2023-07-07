<<<<<<< HEAD
const express= require('express');
const router= express.Router();

const users_controller= require('../controllers/user_controller');

//made separate for handling user specific requests
router.use('/users', require('./users'));
router.use('/registration', require('./registration'));
router.get('/', users_controller.home);
=======
const express= require('express');
const router= express.Router();
const passport= require('passport');

const home_controller= require('../controllers/home_controller');

//made separate for handling user specific requests
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));
router.use('/companies', require('./companies'));

router.get('/', passport.checkAuthentication, home_controller.home);

>>>>>>> dee357abdf8dab5134a2b8951511bd7c735eb746
module.exports= router;