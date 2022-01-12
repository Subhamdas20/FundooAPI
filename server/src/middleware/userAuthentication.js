const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    let token = req.header('token')
    jwt.verify(token, process.env.TOKEN_SECRET, ((err, decoder) => {
        if (err) {
            return res.status(401).send({ message: "Not authenticated" })
        }
        else {
            req.body['data'] = decoder;
          
            next();
        }
    }))
}

module.exports = authentication;