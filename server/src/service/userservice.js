const model = require('../models/userModels')
const userModel = model.userModel;
const newModel = model.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
// const nodeMailer = require('../middleware/nodemailer.js')
const logger = require('../config/logger');
require('dotenv').config();

const userService = {
    registerService: async (req) => {
        let userDetails = await userModel.foundUser({ email: req.email });
        if (!userDetails.data) {
            const passwordHash = await bcrypt.hash(req.password, 10)
            let newUser = new newModel({
                firstname: req.firstname,
                lastname: req.lastname,
                email: req.email,
                password: passwordHash
            })
            let saveData = userModel.registerUserModel(newUser);
            return saveData;
        }
        else return userDetails;
    },
    loginService: async (req) => {
        let userDetails = await userModel.foundUser({ email: req.email });
        if (userDetails.data) {
            let passwordVerify = await bcrypt.compare(req.password, userDetails.data.password)
            if (passwordVerify) {
                const payload = { id: userDetails.data._id, email: userDetails.data.email }
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
                return new Promise((resolve, reject) => {
                    resolve({
                        message: "Login success",
                        data: {
                            userId: userDetails.data._id,
                            firstname: userDetails.data.firstname,
                            lastname: userDetails.data.lastname,
                            email: userDetails.data.email,
                            createdAt: userDetails.data.createdAt,
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
                        statusCode: 404,
                        name: "Error",
                        message: "invalid password",
                        code: "LOGIN_FAILED"
                    })

                })
            }
        }
        else {
            return new Promise((resolve, reject) => {
                reject({
                    statusCode: 404,
                    name: "Error",
                    message: "Email not found! Register First",
                    code: "LOGIN_FAILED"
                })

            })
        };
    },
    forgetPasswordService: async (req, res) => {
        let userDetails = await userModel.foundUser({ email: req.email });
        if (userDetails.data) {
            const payload = { id: userDetails.data._id, email: userDetails.data.email }
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
            logger.info(token)
         
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
                Here is the link to reset password  <a href="http://localhost:4000/resetpassword/${token}">click here</a></div>`
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {

                    logger.error(err);
                } else {
                    logger.info('Email sent successfully');
                }
            });
            return new Promise((resolve, reject) => {
                let response = {
                    message: "Email sent",
                    data: "",
                    success: "true",
                    status: 200
                }
                resolve(response)
            })
        }
        else return userDetails;
    },
    resetPasswordService: async (req, res) => {
        let response = {
            message: "Password Updated",
            data: "",
            success: "true",
            status: 200
        }
        let userDetails = await userModel.foundUser({ _id: req.data.id });
        if (userDetails.data) {
            const passwordHash = await bcrypt.hash(req.password, 10)
            let updatedData = newModel.findByIdAndUpdate(req.data.id, { password: passwordHash }, function (err, docs) {
                if (err) {
                    logger.info(err)
                }
                else  {
                    logger.info("reset successful")
                };
            })
            return new Promise((resolve, reject) => {
                logger.info(response);
                resolve(response)
            })

        }
        else return userDetails;
    }
}

module.exports = userService


