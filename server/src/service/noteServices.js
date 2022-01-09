const notesModel = require('../models/notesModel')
const notes = notesModel.notes
const NotesModel = notesModel.notesModel


let noteService = {
    createNoteService: async (req, res) => {
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
    },

    getNoteService: async (req, res) => {
        let foundNote = await NotesModel.findNotes({ user_ID: req.data.id });
        if (foundNote) return foundNote;
    },
    deleteNoteService: async (req, res) => {
        let foundNote = await NotesModel.searchNotes(req);
        if (foundNote) {
            return await notes.deleteOne({ _id: foundNote.data._id })
        }
    },
    updateNoteService: async (req, res) => {
        let foundNote = await NotesModel.searchNotes(req, res);
        if (foundNote.data) {
            let data = await NotesModel.updateNote(req, foundNote)
            return data;
        }
        else return foundNote;
    },
    getisArchievedService: async (req, res) => {
        let foundNote = await NotesModel.findNotes({ user_ID: req.data.id, isArchieved: true });
        return foundNote
    },
    getisDeletedService: async (req, res) => {
        let foundNote = await NotesModel.findNotes({ user_ID: req.data.id, isDeleted: true });
        if (foundNote) {
            return foundNote
        };
    }
}

module.exports = noteService;