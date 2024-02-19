const mongoose = require("mongoose")

const getCon = async() =>{
    await mongoose.connect("mongodb://localhost:27017/Authusers").then((res)=>{console.log("Database Running")}).catch((err)=>{console.log(err)})
}

getCon()