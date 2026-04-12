const express = require("express") 
const { postUser, loginUser, forgotPassword, resetPassword } = require("../controller/userController")


const router = express.Router()

router.post("/signup", postUser)
router.post("/login", loginUser)
router.post("/forgot", forgotPassword)
router.post("/reset/:token",resetPassword)
module.exports = router