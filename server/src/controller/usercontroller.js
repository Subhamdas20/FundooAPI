
const logger = require('../config/logger.js');
const service = require('../service/userservice.js')
class UserController {
    async registerUser(req, res) {
        await service.registerService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in registerUser")
            return res.status(400).send(err);
        }))
    }
    async loginUser(req, res) {
        await service.loginService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in loginUser")
            return res.status(400).send(err);
        }))
    }
    async forgetUser(req, res) {
        await service.forgetService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in forgetUser")
            return res.status(400).send(err);
        }))
    }
    async resetUser(req, res) {
        await service.resetService(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err => {
            logger.error("Error in resetUser")
            return res.status(400).send(err);
        }))
    }
}
module.exports = new UserController();

