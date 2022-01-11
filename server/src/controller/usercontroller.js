
const logger = require('../config/logger.js');
const userService = require('../service/userService')

const userController = {
    registerUser: async (req, res) => {
        await userService.registerService(req.body).then((result) => {

            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in registerUser", err)
            return res.status(400).send(err);
        }))
    },
    loginUser: async (req, res) => {
        await userService.loginService(req.body).then((result) => {

            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in loginUser", err)
            return res.status(403).send(err);
        }))
    },
    forgetUser: async (req, res) => {
        await userService.forgetService(req.body).then((result) => {

            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in forgetUser", err)
            return res.status(403).send(err);
        }))
    },
    resetUser: async (req, res) => {
        await userService.resetService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in resetUser", err)
            return res.status(403).send(err);
        }))
    }
}


module.exports = userController;
