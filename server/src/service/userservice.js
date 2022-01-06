const model = require('../models/userModels')
const userModel = new model.UserModel();
const newModel = model.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config();
class UserService {
    async registerService(req, res) {
        let foundUser = await userModel.findUser ({ email: req.email});
        if (!foundUser.data) {
            const passwordHash = await bcrypt.hash(req.password, 10)
            let newUser = new newModel({
                firstname: req.firstname,
                lastname: req.lastname,
                email: req.email,
                password: passwordHash
            })
            let saveData = userModel.registerModel(newUser);
            return saveData;
        }
        else return foundUser;
    }

    async loginService(req, res) {
        let findUser = await userModel.findUser({ email: req.email });

        if (findUser.data) {
            let passwordVerify = await bcrypt.compare(req.password, findUser.data.password)
            if (passwordVerify) {
                const payload = { id: findUser.data._id, email: findUser.data.email }
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
                            token: token
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
    async forgetService(req, res) {
        let foundUser = await userModel.findUser({ email: req.email });
        if (foundUser.data) {
            const payload = { id: foundUser.data._id, email: foundUser.data.email }
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            let mailDetails = {
                from: process.env.EMAIL,
                to: req.email,
                subject: 'Forgot password',
                html: `<div>
                Hi,
                Here is the link to reset password <a href="http://localhost:4000/resetpassword">click here</a></div>`
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error');
                    console.log(err);
                } else {
                    console.log('Email sent successfully');
                }
            });
        }
        else return foundUser;
    }
    async resetService(req, res) {
        let foundUser = await userModel.findUser({ _id: req.data.id });
        if (foundUser.data) {
            const passwordHash = await bcrypt.hash(req.password, 10)
            let updatedData = newModel.updateOne({ _id: req.data.id }, { password: passwordHash });
        }
        else return foundUser;
    }
}

module.exports = new UserService();