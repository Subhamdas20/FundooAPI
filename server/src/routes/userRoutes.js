
const express = require('express')
const controller = require('../controller/controller')
const validate = require('../middleware/userValidation')
const NotesController = require('../controller/notesController')
const auth = require('../middleware/userAuthentication')

const router = express.Router();

router.post("/register",validate.registerValidate,controller.registerUser);

router.post("/login",validate.loginValidate,controller.loginUser);
router.post("/addNote",auth,NotesController.addNotes);

module.exports = router;

