const mongoose = require("mongoose")


const userOtpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },otp:{
        required:true,
        type:String
    }
})

exports.userOtpModel = mongoose.model("userotps",userOtpSchema)