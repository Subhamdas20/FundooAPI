

let registerValidate = (req, res, next) => {
    req
        .check("firstname")
        .isAlpha()
        .withMessage("firstName is required")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required in FirstName");
    req
        .check("lastname")
        .isAlpha()
        .withMessage("lastName is required")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required in LastName");
   
    req.check("email").isEmail().withMessage("Email is not valid");

    req
        .check("password")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required")
        .isLength({ max: 15 })
        .withMessage("Max 10 alphabet allowed in password");

    let error = req.validationErrors();
    if (error) {
        return res.status(500).send(error);
    } else {
        next();
    }
}

let loginValidate = (req, res, next) => {   
     req.check("email").isEmail().withMessage("Email is not valid");
    req
        .check("password")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required")
        .isLength({ max: 15 })
        .withMessage("Max 10 alphabet allowed in password");

    let error = req.validationErrors();
    if (error) {
        return res.status(500).send(error);
    } else {
        next();
    }
}
module.exports ={ registerValidate,loginValidate}