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
}

module.exports = { notes, NoteModel }