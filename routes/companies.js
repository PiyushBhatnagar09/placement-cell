const express= require('express');
const router= express.Router();
const passport= require('passport');
const company_controller= require('../controllers/company_controller');

router.post('/add-company', passport.checkAuthentication, company_controller.addCompany);

module.exports= router;