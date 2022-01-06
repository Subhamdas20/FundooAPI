
require('dotenv').config()
const express = require('express')
const database = require('../server/src/config/database')
let validator = require('express-validator')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../server/swagger.json");


const router = require('../server/src/routes/userRoutes')
const app = express();
const PORT = process.env.PORT;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(validator())
app.use('/',router)

app.listen(PORT, () => { console.log(`server running at Port ${PORT}`) })
database()


