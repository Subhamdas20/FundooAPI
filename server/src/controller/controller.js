
const service = require('../service/service.js')
class UserController {
    async registerUser(req, res) {
        await service.registerService(req.body).then((result) => {
            res.status(200).json( result )
        }).catch((err => {          
            return res.status(400).send(err);
        }))
    }
    async loginUser(req,res){
        await service.loginService(req.body).then((result) => {
            res.status(200).json( result )
        }).catch((err => {
            return res.status(400).send(err);
        }))
    }
    async forgetUser(req,res){
        await service.forgetService(req.body).then((result) => {
            res.status(200).json( result )
        }).catch((err => {
            return res.status(400).send(err);
        }))
    }
    async resetUser(req,res){
        await service.resetService(req.body).then((result) => {
            res.status(200).json( result )
        }).catch((err => {
            return res.status(400).send(err);
        }))
    }
}
module.exports = new UserController();

