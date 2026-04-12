const express = require("express") 
const { postUser, loginUser, forgotPassword, resetPassword, genratText } = require("../controller/userController")


const router = express.Router()

router.post("/signup", postUser)
router.post("/login", loginUser)
router.post("/forgot", forgotPassword)
router.post("/reset/:token", resetPassword)
router.post("/genret",genratText)
module.exports = router