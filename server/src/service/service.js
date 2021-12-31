const model = require('../models/userModels')
const userModel = new model.UserModel();
const newModel = model.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserService {
    async registerService(reqObj, res) {
        let foundUser = await userModel.findUser(reqObj); 
        // console.log(foundUser);
        if (!foundUser.data) {
            const passwordHash = await bcrypt.hash(reqObj.password, 10)
            let newUser = new newModel({
                firstname: reqObj.firstname,
                lastname: reqObj.lastname,
                email: reqObj.email,
                password: passwordHash
            })
            let saveData = userModel.registerModel(newUser);

            return saveData;
        }
        else return foundUser;
    }

    async loginService(req, res) {
        let findUser = await userModel.findUser(req);
        console.log()
        if (findUser.data) {
            let passwordVerify = await bcrypt.compare(req.password, findUser.data.password)
            if (passwordVerify) {
                const payload = { id: findUser.data._id, email:findUser.data.email }
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
                return new Promise((resolve, reject) => {
                    resolve({
                        message: "Login success",
                        data: {
                            userId: findUser.data._id,
                            firstname: findUser.data.firstname,
                            lastname: findUser.data.lastname,
                            email: findUser.data.email,
                            createdAt: findUser.data.createdAt,
                            token:token
                        },
                        success: "",
                        status: 200
                    })

                })
            }
            else {
                return new Promise((resolve, reject) => {
                    reject({
                        statusCode: 400,
                        name: "Error",
                        message: "invalid password",
                        code: "LOGIN_FAILED"
                    })

                })
            }
        }
        else return findUser;
    }
}

module.exports = new UserService();