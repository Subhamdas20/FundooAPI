const express = require('express')

const noteValidate = require ('../middleware/noteValidation')
const NotesController = require('../controller/notesController')
const authentication = require('../middleware/userAuthentication')
const router = express.Router();

router.post("/notes", noteValidate.addNotes,authentication, NotesController.addNotes);
router.get("/notes", authentication, NotesController.getNotes);
router.delete("/notes", authentication, NotesController.deleteNotes);
router.put('/notes', authentication, NotesController.updateNotes)
router.get("/notes/isArchieved", authentication, NotesController.getisArchievedNotes);
router.get("/notes/isDeleted", authentication, NotesController.getisDeletedNotes);

module.exports = router;
