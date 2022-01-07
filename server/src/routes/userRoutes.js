
const express = require('express')
const userController = require('../controller/usercontroller')
const validate = require('../middleware/userValidation')
const NotesController = require('../controller/notesController')
const auth = require('../middleware/userAuthentication')
const router = express.Router();


router.post("/register", validate.registerValidate, userController.registerUser);
router.post("/login", validate.loginValidate, userController.loginUser);
router.post("/forgetpassword", userController.forgetUser)
router.post("/resetpassword", auth, userController.resetUser)

router.post("/addNote", auth, NotesController.addNotes);
router.get("/getNote", auth, NotesController.getNotes);
router.delete("/deleteNote", auth, NotesController.deleteNotes);
router.put('/updateNote', auth, NotesController.updateNotes)
router.get("/isArchieved", auth, NotesController.getNotes);
router.get("/isDeleted", auth, NotesController.getNotes);

module.exports = router;

