const mongoose = require('mongoose')

const addNotes = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    isPined: { type: String },
    isArchieved: { type: Boolean },
    isDeleted: { type: Boolean },
    color: { type: String },
    user_ID: { type: String },
    user_Email: { type: String }
}, {
    timestamps: true,
})

const notes = mongoose.model('Notes', addNotes);

class NoteModel {
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
    findNotes(req) {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };
        return new Promise((resolve, reject) => {
            notes.find({ user_ID: req.data.id })
                .then((data) => {
                    if (data) {
                        (response.success = true),
                            (response.data = data),
                            (response.status = 202),
                            (response.message = "Notes found");
                        resolve(response);
                    }
                    else {
                        resolve({
                            message: "Notes not found",
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
    searchNotes(req) {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };
        return new Promise((resolve, reject) => {
            notes.findOne({ _id: req._id })
                .then((data) => {
                    if (data) {

                        (response.success = true),
                            (response.data = data),
                            (response.status = 202),
                            (response.message = "Notes found");
                        resolve(response);
                    }

                    else {
                        resolve({
                            message: "Notes not found",
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
}

module.exports = { notes, NoteModel }