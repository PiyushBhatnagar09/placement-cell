const express= require('express');
const router= express.Router();

const aadhaar_controller= require('../controllers/aadhaar_controller');

//handling requests
router.post('/generateOtp', aadhaar_controller.generateOtp);
router.post('/generateHealthId', aadhaar_controller.generateHealthId);
router.post('/createHealthIdWithPreVerified', aadhaar_controller.createHealthIdWithPreVerified);
router.post('/resendAadhaarOtp/', aadhaar_controller.resendAadhaarOtp);
router.post('/verifyOTP/', aadhaar_controller.verifyOTP);
module.exports= router;