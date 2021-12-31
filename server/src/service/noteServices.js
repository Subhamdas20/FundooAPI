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
        let foundNote = await NotesModel.findNotes(req);
        if (foundNote) return foundNote;
        else return new Promise((resolve, reject) => {
            reject({
                statusCode: 400,
                name: "Error",
                message: "Notes not found",
            })
        });
    }
    async deleteNoteService(req, res) {
        let foundNote = await NotesModel.searchNotes(req);
        if (foundNote) {
            return await notes.deleteOne({ _id: foundNote.data._id })
        }
    }

    async updateNoteService(req, res) {
        let foundNote = await NotesModel.searchNotes(req);
        // console.log(req);
        console.log(foundNote);
        if (foundNote) {
            return await notes.updateOne({ _id: foundNote.data._id }, {
                $set: {
                    title: req.title,
                    description: req.description,
                    isPined: req.isPined,
                    isArchieved: req.isArchieved,
                    isDeleted: req.isArchieved,
                    color: req.color,
                   
                }
            })
        }
    }


}
module.exports = new NoteService();