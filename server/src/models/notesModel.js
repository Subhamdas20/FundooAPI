const mongoose = require('mongoose')

const addNotes = new mongoose.Schema({
    title: { type: String ,
        required: true},
    description: { type: String,
        required: true },
    isPined: { type: String ,
        required: true},
    isArchieved: { type: Boolean,
        required: true },
    isDeleted: { type: Boolean ,
        required: true},
    color: { type: String,
        required: true },
    user_ID: { type: String ,
        required: true},
    user_Email: { type: String ,
        required: true}
}, {
    timestamps: true,
})

const notes = mongoose.model('Notes', addNotes);

let notesModel = {

    registerModel: (obj) => {
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
    },
    findNotes: (req) => {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };
        return new Promise((resolve, reject) => {
            notes.find(req)
                .then((data) => {
                    if (data) {
                        (response.success = true),
                            (response.data = data),
                            (response.status = 200),
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
    },
    searchNotes: (req) => {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };
        return new Promise((resolve, reject) => {
            notes.findOne({ _id: req._id, user_Email: req.data.email })
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
    },
    updateNote: (req, data) => {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };
        let NoteModel = {
            title: req.title ? req.title : data.title,
            description: req.description ? req.description : data.description,
            isPined: req.isPined ? req.isPined : data.isPined,
            isArchieved: req.isArchieved ? req.isArchieved : data.isArchieved,
            isDeleted: req.isDeleted ? req.isDeleted : data.isDeleted,
            color: req.color ? req.color : data.color,
        }
        return new Promise((resolve, reject) => {
            notes.updateOne({ _id: req._id }, NoteModel)
                .then((result) => {
                    if (result) {
                        (response.success = true),
                            (response.result = result),
                            (response.status = 200),
                            (response.message = "Notes Updated");
                        resolve(response)
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


module.exports = { notes, notesModel }