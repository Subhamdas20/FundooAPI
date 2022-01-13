
const express = require('express')
const userController = require('../controller/usercontroller')
const userValidate = require('../middleware/userValidation')
const noteValidate = require ('../middleware/noteValidation')
const NotesController = require('../controller/notesController')
const authentication = require('../middleware/userAuthentication')
const router = express.Router();


router.post("/register", userValidate.registerValidation, userController.registerUser);
router.post("/login",userValidate.loginVaidation, userController.loginUser);
router.post("/forgetpassword", userValidate.forgetPasswordValidation, userController.forgetPasswordUser)
router.post("/resetpassword", authentication, userController.resetPasswordUser)

router.post("/addNote", noteValidate.addNotes,authentication, NotesController.addNotes);
router.get("/getNote", authentication, NotesController.getNotes);
router.delete("/deleteNote", authentication, NotesController.deleteNotes);
router.put('/updateNote', authentication, NotesController.updateNotes)
router.get("/isArchieved", authentication, NotesController.getisArchievedNotes);
router.get("/isDeleted", authentication, NotesController.getisDeletedNotes);

module.exports = router;

