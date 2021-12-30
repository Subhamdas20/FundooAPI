
const service = require('../service/service.js')
class UserController {

    async registerUser(req, res) {
        await service.registerService(req.body).then((result) => {
            res.status(200).json({ result })
        }).catch((err => {
            
            return res.status(500).send(err);

        }))
    }

}
module.exports = new UserController();

