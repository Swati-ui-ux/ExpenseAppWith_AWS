const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const postUser = async (req,res) => {
try {
    const { name, email, password } = req.body
    console.log("body", req.body)
    const hashPassword = await bcrypt.hash(password,10)
    const user = await User.create({ name, email, password:hashPassword }
    )
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
    return res.status(400).json({message:"User allready exist"})
    }
    console.log(user)
    if (!user) return res.status(404).json({ message: "User not ceated" })
    res.status(201).json({ message: "User ceated successful" })
} catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error" })
}
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
      
        // find user by email
    const user =  await User.findOne({
            where: {
            email
            }
    })
        if(!user ) return res.status(404).json({message:"User not found"})
        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(404).json({ message: "Invalid password" })
        
        // token genrate 
        const token = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "1h" })
        console.log("token mil gya", token)
        
        res.status(200).json({message:"Login success",token})
        
    } catch (error) {
        console.log("Error login ",error)
    res.status(500).json({message:"Error in login",error})
}
}

module.exports = {postUser,loginUser}