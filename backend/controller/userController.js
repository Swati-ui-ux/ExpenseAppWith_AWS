const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
 require("dotenv").config()
const {GoogleGenAI} = require("@google/genai")
const sendEmail = require("../utils/sendEmail")
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
        const token = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "7d" })
        console.log("token mil gya", token)
        
        res.status(200).json({message:"Login successful",token})
        
    } catch (error) {
        console.log("Error login ",error)
    res.status(500).json({message:"Error in login",error})
}
}


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = new Date(Date.now() + 3600000); // 1 hour

    await user.save();

    const link = `http://localhost:5173/reset/${token}`;

    await sendEmail(email, link);

    res.status(200).json({ message: "Reset link sent successfully" });

  } catch (error) {
    console.log("Error in forgotPassword:", error);
    res.status(500).json({ message: "Error in forgot password" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};




const genratText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    if (!process.env.GEN_API_KEY) {
      return res.status(500).json({
        message: "API key missing",
      });
    }

   
    const ai = new GoogleGenAI({
      apiKey: process.env.GEN_API_KEY,
    });

 
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",   
      contents: text,
    });

    
    const data = response.text();

    console.log("AI Response:", data);

    return res.status(200).json({
      message: "success",
      data,
    });

  } catch (error) {
    console.log("AI Error:", error);
    console.log("Message:", error.message);

    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};



// export default genratText;

module.exports = {postUser,loginUser,forgotPassword,resetPassword,genratText}