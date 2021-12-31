const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    let token = req.get('token')
    // console.log('token is ', token);

    jwt.verify(token, process.env.TOKEN_SECRET, ((err, decoder) => {
        if (err) {
            return res.status(401).send({ message: "Not Authenticated" })
        }
        else {
            req.body['data'] = decoder;
            req.token = decoder;
            next();
        }
    }))
}

module.exports = auth;