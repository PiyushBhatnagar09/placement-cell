const express= require('express');
const router= express.Router();

const registration_controller= require('../controllers/registration_controller');

router.post('/aadhaar/generateAadhaarOtp', registration_controller.generateAadhaarOtp);
router.post('/aadhaar/resendAadhaarOtp/', registration_controller.resendAadhaarOtp);
router.post('/aadhaar/verifyAadhaarOTP/', registration_controller.verifyAadhaarOTP);

router.post('/aadhaar/generateMobileOTP', registration_controller.generateMobileOTP);
router.post('/aadhaar/verifyMobileOTP/', registration_controller.verifyMobileOTP);

router.post('/aadhaar/createHealthIdWithPreVerified', registration_controller.createHealthIdWithPreVerified);

//search abha address in database of abdm
router.post('/abha_address/search', registration_controller.searchAbhaAddress);

//link and delink abha address
router.post('/abha_address/link', registration_controller.searchAbhaAddress);
router.post('/abha_address/delink', registration_controller.searchAbhaAddress);

module.exports= router;