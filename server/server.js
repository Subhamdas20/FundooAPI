
require('dotenv').config()
const express = require('express')
const database = require('../server/src/config/database')

const router = require('../server/src/routes/userRoutes')
const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use('/',router)


app.listen(PORT, () => { console.log(`server running at Port ${PORT}`) })

database()


