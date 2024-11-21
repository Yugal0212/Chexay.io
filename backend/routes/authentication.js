const router = require('express').Router();

const {changePassword,logout,loginWithUserAndPass,registerUser,otpVerification,forPassOtpGen} = require('../controller/authenticationController')


//login api




//signUp api
router.post('/signup',registerUser);

//otp verification 
router.post('/otp',otpVerification);

//username and password verification

router.post('/login',loginWithUserAndPass)

//forgot password
router.post('/forgotOtp',forPassOtpGen)

//change password

router.post('/changePassword',changePassword)

//logout api
router.post('/logout',logout)


module.exports = router;
