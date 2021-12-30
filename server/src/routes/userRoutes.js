
const express = require('express')
const controller = require('../controller/controller')

const router = express.Router();

router.post("/register",controller.registerUser);


module.exports = router;

