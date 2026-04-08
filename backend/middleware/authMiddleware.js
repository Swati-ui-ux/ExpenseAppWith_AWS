const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log("Token-------------- 💌💌",authHeader)
    if (!authHeader||!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }
        const token = authHeader.split(" ")[1];
    try {
        
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}
module.exports = authMiddleware