const express = require("express");
const router = express.Router();
const controllers =  require("../controllers/userRegister")

router.post("/user/register",controllers.userRegister)

router.post("/user/sendotp",controllers.userOtpSend)



module.exports = router