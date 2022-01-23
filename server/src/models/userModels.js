const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
         required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const User = mongoose.model('Users', userSchema);
let userModel = {
    foundUser: (req) => {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };

        return new Promise((resolve, reject) => {
            User.findOne(req)
                .then((data) => {
                    if (data) {
                        (response.success = true),
                            (response.data = data),
                            (response.status = 202),
                            (response.message = "user already exists");
                        resolve(response);
                    }
                    else {
                        resolve({
                            message: "user not found please register first",
                            data: null,
                            status: 404
                        });
                    }
                })
                .catch((err) => {
                    reject(
                        { success: false, error: err }
                    );
                });
        });
    },

    registerUserModel: (obj) => {
        let response = {
            sucess: true,
            message: '',
            data: "",
            status: 200
        };
        return new Promise((resolve, reject) => {
            obj.save().then((dataaa) => {
                (response.sucess = true),
                    (response.message = "register success"),
                    (response.data = dataaa);
                (response.status = 200);
                resolve({ response });
            }).catch((err) => {

                response.sucess = false,
                    response.message = "register failed"
                response.data = "";
                (response.status = 400);
                reject({ response });
            })
        })
    }

}

module.exports = { userModel, User };