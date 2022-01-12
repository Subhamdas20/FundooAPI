
const logger = require('../config/logger');
const noteService = require('../service/noteServices')

const noteController = {
    addNotes: async (req, res) => {
        await noteService.createNoteService(req.body).then((result) => {
            logger.info("Notes added successfully")
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in add notes")
            return res.status(400).send(err);
        }))
    },
    getNotes: async (req, res) => {
        await noteService.getNoteService(req.body).then((result) => {
            logger.info("Get notes successful")
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in get notes")
            return res.status(400).send(err);
        }))
    },
    deleteNotes: async (req, res) => {
        await noteService.deleteNoteService(req.body).then((result) => {
            logger.info("Delete notes sucessful")
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in delete notes")
            return res.status(400).send(err);
        }))
    },
    updateNotes: async (req, res) => {
        await noteService.updateNoteService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in update notes")
            return res.status(400).send(err);
        }))
    },
    getisArchievedNotes: async (req, res) => {
        await noteService.getisArchievedService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in getingisArchieved notes")
            return res.status(400).send(err);
        }))
    },
    getisDeletedNotes: async (req, res) => {
        await noteService.getisDeletedService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in getingisDeleted notes")
            return res.status(400).send(err);
        }))
    }
}

module.exports = noteController;
