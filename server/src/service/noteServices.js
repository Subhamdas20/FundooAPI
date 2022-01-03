const notesModel = require('../models/notesModel')
const notes = notesModel.notes
const NotesModel = new notesModel.NoteModel()

class NoteService {
    async createNoteService(req, res) {
        let newUser = new notes({
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
    async getNoteService(req, res) {
        let foundNote = await NotesModel.findNotes({ user_ID: req.data.id });
        if (foundNote) return foundNote;
    }
    async deleteNoteService(req, res) {
        let foundNote = await NotesModel.searchNotes(req);
        if (foundNote) {
            return await notes.deleteOne({ _id: foundNote.data._id })
        }
    }

    async updateNoteService(req, res) {
        let foundNote = await NotesModel.searchNotes(req,res);
      
        if (foundNote.data) {
            let data = await NotesModel.updateNote(req,foundNote)
            return data;
        }
        else return foundNote;
       
    }
    async getisArchievedService(req, res) {
        let foundNote = await NotesModel.findNotes({ user_ID: req.data.id, isArchieved: true });
        if (foundNote) {
            return foundNote
        };

    }
    async getisDeletedService(req, res) {
        let foundNote = await NotesModel.findisDeletedNotes({ user_ID: req.data.id, isDeleted: true });
        if (foundNote) {
            return foundNote
        };
    }
}
module.exports = new NoteService();