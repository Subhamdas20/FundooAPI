const { response } = require('express');
const model = require('../models/userModels')
const userModel = new model.UserModel();
const newModel = model.User;
const bcrypt = require('bcrypt')

class UserService {
    async registerService(reqObj, res) {

        let foundUser = await userModel.findUser(reqObj);
        if (!foundUser.data) {
            const passwordHash = await bcrypt.hash(reqObj.password, 10)
            let newUser = new newModel({
                firstname: reqObj.firstname,
                lastname: reqObj.lastname,
                username: reqObj.username,
                email: reqObj.email,
                password: passwordHash
            })
            let saveData = userModel.registerModel(newUser);
            return saveData;
        }
        else return foundUser;
    }
}

module.exports = new UserService();