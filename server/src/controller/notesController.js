
const logger = require('../config/logger');
const noteService = require('../service/noteServices')
class NotesController {
    async addNotes(req, res) {
        await noteService.createNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in add notes")
            return res.status(400).send(err);
        }))
    }
    async getNotes(req, res) {
        await noteService.getNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in get notes")
            return res.status(400).send(err);
        }))
    }
    async deleteNotes(req, res) {
        await noteService.deleteNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in delete notes")
            return res.status(400).send(err);
        }))
    }
    async updateNotes(req, res) {
        await noteService.updateNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in update notes")
            return res.status(400).send(err);
        }))
    }
    async getisArchievedNotes(req, res) {
        await noteService.getisArchievedService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in getingisArchieved notes")
            return res.status(400).send(err);
        }))
    }
    async getisDeletedNotes(req, res) {
        await noteService.getisDeletedService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in getingisDeleted notes")
            return res.status(400).send(err);
        }))
    }
}
module.exports = new NotesController();
