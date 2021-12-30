
const express = require('express')
const controller = require('../controller/controller')
const validate = require('../middleware/userValidation')

const router = express.Router();

router.post("/register",validate,controller.registerUser);


module.exports = router;

