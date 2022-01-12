
require('dotenv').config()
const express = require('express')
const database = require('../server/src/config/database')
let validator = require('express-validator')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../server/swagger.json");

const router = require('./src/routes/routes');
const logger = require('./src/config/logger');

const app = express();
const PORT = process.env.PORT;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(validator())
app.use('/',router)

app.listen(PORT, () => { 
 logger.info(`server running at Port ${PORT}`) })
database()

module.exports = app 
