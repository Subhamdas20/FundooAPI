
let userValidate = {

    registerValidation: (req, res, next) => {
        req
            .check("firstname")
            .isAlpha()
            .withMessage("firstName is required")
            .isLength({ min: 2 })
            .withMessage("Min 2 alphabet required in FirstName");
        req
            .check("lastname")
            .isAlpha()
            .withMessage("lastName is required")
            .isLength({ min: 2 })
            .withMessage("Min 2 alphabet required in LastName");

        req.check("email").isEmail().withMessage("Email is not valid");

        req
            .check("password")
            .isLength({ min: 3 })
            .withMessage("Min 3 alphabet required")
            .isLength({ max: 15 })
            .withMessage("Max 15 alphabet allowed in password");

        let error = req.validationErrors();
        if (error) {
            return res.status(404).send(error);
        } else {
            next();
        }
    },
    loginVaidation: (req, res, next) => {
        req.check("email").isEmail().withMessage("Email is not valid");
        req
            .check("password")
            .isLength({ min: 3 })
            .withMessage("Min 3 alphabet required")
            .isLength({ max: 15 })
            .withMessage("Max 10 alphabet allowed in password");

        let error = req.validationErrors();
        if (error) {
            return res.status(404).send(error);
        } else {
            next();
        }
    },
    forgetPasswordValidation : (req,res,next)=>{
        req.check("email").isEmail().withMessage("Email is not valid");
        
        let error = req.validationErrors();
        if (error) {
            return res.status(404).send(error);
        } else {
            next();
        }
    }
}

module.exports = userValidate