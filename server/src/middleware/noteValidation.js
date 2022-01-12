

let noteValidate = {
    addNotes: (req, res, next) => {
        req
            .check("title")
            .isLength({ min: 2 })
            .withMessage('title must be 2 characters long')
           

        req
            .check("description")
            .isLength({ min: 2 })
            .withMessage('description must be 2 characters long')
           

        req.check("isPined")
            .isLength({ min: 2 })
            .withMessage('isPinned must be 2 characters long')
      

        req.check("isArchieved")
            .isBoolean()
            .withMessage('isArchieved Must be a boolean true or false')
         

        req.check("isDeleted")
            .isBoolean()
            .withMessage('isDeleted Must be a boolean true or false')
          

        let error = req.validationErrors();
        if (error) {
            return res.status(403).send(error);
        } else {
            next();
        }
    }

}
module.exports = noteValidate