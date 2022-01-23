const express = require('express')
const userController = require('../controller/usercontroller')
const userValidate = require('../middleware/userValidation')
const authentication = require('../middleware/userAuthentication')
const router = express.Router();

router.post("/register", userValidate.registerValidation, userController.registerUser);
router.post("/login",userValidate.loginVaidation, userController.loginUser);
router.post("/forgetpassword", userValidate.forgetPasswordValidation, userController.forgetPasswordUser)
router.post("/resetpassword", authentication, userController.resetPasswordUser)

module.exports = router;