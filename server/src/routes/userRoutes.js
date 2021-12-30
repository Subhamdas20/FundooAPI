
const express = require('express')
const controller = require('../controller/controller')
const validate = require('../middleware/userValidation')

const router = express.Router();

router.post("/register",validate.registerValidate,controller.registerUser);

router.post("/login",validate.loginValidate,controller.loginUser);

module.exports = router;

