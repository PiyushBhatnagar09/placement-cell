const express= require('express');
const router= express.Router();

const login_controller= require('../controllers/login_controller');

// router.post('/aadhaar/generateAadhaarOtp', aadhaar_controller.generateAadhaarOtp);
router.post('/aadhaarOtp', login_controller.aadhaarOtp);
router.post('/mobileOtp', login_controller.mobileOtp);
router.post('');
router.post('');

module.exports= router;