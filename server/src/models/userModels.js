const mongoose = require('mongoose')
// const validator = require('validator')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('Users', userSchema);
class UserModel {
    findUser(req) {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };
        return new Promise((resolve, reject) => {
            User.findOne({ email: req.email })
                .then((data) => {
                    if (data) {
                        (response.success = true),
                            (response.data = data),
                            (response.status = 422),
                            (response.message = "user already exists");
                        resolve(response);
                    }

                    else {
                        reject({
                            message: "user not found please register first",
                            data: null,
                            status: 400
                        });
                    }
                })
                .catch((err) => {
                    reject(
                        { success: false, error: err }
                    );
                });
        });
    }
  

    registerModel(obj) {
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
                console.log(err)
                response.sucess = false,
                    response.message = "register failed"
                response.data = "";
                (response.status = 500);
                reject({ response });
            })
        })
    }
}

module.exports = { UserModel, User };