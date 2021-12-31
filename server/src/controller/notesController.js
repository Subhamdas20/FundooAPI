
const noteService = require('../service/noteServices')
class NotesController {
    async addNotes(req, res) {
        await noteService.createNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            return res.status(400).send(err);
        }))
    }
    async getNotes(req, res) {
        await noteService.getNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            return res.status(400).send(err);
        }))
    }
}
module.exports = new NotesController();
