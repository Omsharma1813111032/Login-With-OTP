const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    fname:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,minlength:6}
})


userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password,12)
    }
    next()
})


const userModel = mongoose.model("users", userSchema)
module.exports = userModel;