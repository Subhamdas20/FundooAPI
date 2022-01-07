
const express = require('express')
const userController = require('../controller/usercontroller')
const userValidate = require('../middleware/userValidation')
const NotesController = require('../controller/notesController')
const authentication = require('../middleware/userAuthentication')
const router = express.Router();


router.post("/register", userValidate.registerValidation, userController.registerUser);
router.post("/login",userValidate.loginVaidation, userController.loginUser);
router.post("/forgetpassword", userValidate.forgetPasswordValidation, userController.forgetUser)
router.post("/resetpassword", authentication, userController.resetUser)

router.post("/addNote", authentication, NotesController.addNotes);
router.get("/getNote", authentication, NotesController.getNotes);
router.delete("/deleteNote", authentication, NotesController.deleteNotes);
router.put('/updateNote', authentication, NotesController.updateNotes)
router.get("/isArchieved", authentication, NotesController.getNotes);
router.get("/isDeleted", authentication, NotesController.getNotes);

module.exports = router;

