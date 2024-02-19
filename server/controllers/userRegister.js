const userModel = require("../models/userSchema")
const userOtp = require("../models/userOtp")
const nodeMailer = require("nodemailer")

// mail configuration
const transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        email:process.env.EMAIL,
        password:process.env.PASSWORD,
    }
})


exports.userRegister = async(req,res) =>{

    const {fname,email,password} = req.body
    
    if(!fname || !email || !password){
        res.status(401).json({Error:"Enter Valid Data"})
    }


    try{

        const validUser = await userModel.findOne({email:email})
        
        if(validUser){
            res.status(401).json({Error:"Email Already Exists"})
        }else{
            const newRegister = new userModel({fname,email,password})
            const userData = await newRegister.save()
            console.log(userData)
            res.status(200).json({Message:"Successfully added",userData})
        }

        
    }catch(err){
        res.status(400).json({Error:err})
    }


}


exports.userOtpSend = async(req,res) =>{
    const {email} = req.body

    if(!email){
        res.send(401).json({Error:"Please Enter Email !!"})
    }

    try{

        const validEmail  = await userModel.findOne({email:email})
        if(!validEmail){
            res.status(401).json({Error:"Email Does't Exists !!"})
        }else{

            const OTP = Math.floor(100000+Math.random()*900000)

            const existEmail = await userOtp.find({email:email})

            if(existEmail){
                const updateData = await userOtp.findByIdAndUpdate({_id:existEmail._id},{
                    otp:OTP
                },{new:true});
                await updateData.save()

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"OTP for verification",
                    text:`OTP: - ${OTP}`
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log(error)
                        res.status(400).json({Error:"Error "+error})
                    }else{
                        console.log(info)
                        res.status(200).json({Message:"SuccessFully Send"})
                    }
                })

            }else{
                const saveOtpData = new userOtp({email:email,otp:OTP})
                await saveOtpData.save()
                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"OTP for verification",
                    text:`OTP: - ${OTP}`
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log(error)
                        res.status(400).json({Error:"Error "+error})
                    }else{
                        console.log(info)
                        res.status(200).json({Message:"SuccessFully Send"})
                    }
                })
            }
        }

    }catch(err){
        res.send(400).json({Error:err})
    }

}