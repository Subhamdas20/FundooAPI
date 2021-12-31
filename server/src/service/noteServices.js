const notesModel = require('../models/notesModel')
const addNotes = notesModel.notes
const NotesModel = new notesModel.NoteModel()

class NoteService {

    async createNoteService(req, res) {

        let newUser = new addNotes({
            title: req.title,
            description: req.description,
            isPined: req.isPined,
            isArchieved: req.isArchieved,
            isDeleted: req.isDeleted,
            color: req.color,
            user_ID: req.data.id,
            user_Email: req.data.email,

        })
        let saveData = NotesModel.registerModel(newUser);
        return saveData;
    }
}
module.exports = new NoteService();