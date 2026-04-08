const User = require("../model/User")


const postUser = async (req,res) => {
try {
    const { name, email, password } = req.body
    console.log("body",req.body)
    const user = await User.create({ name, email, password }
    )
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
    return res.status(400).json({message:"User allready exist"})
    }
    console.log(user)
    // if (!user) return res.status(404).json({ message: "User not ceated" })
    res.status(201).json({ message: "User ceated successful" })
} catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error" })
}
}


module.exports = {postUser}