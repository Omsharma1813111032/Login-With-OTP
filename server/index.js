require('dotenv').config()
const express= require("express")
const cors = require("cors")
const getCon = require("./DB/conn")
const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000'
}));

const router  = require("./Routes/router")
app.use(router)







app.listen(4600,()=>{console.log("Server Running")})