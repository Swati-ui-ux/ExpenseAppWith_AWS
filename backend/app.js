const express = require("express")
const app = express()
const port = 3000
const db = require("./utils/db")
const userRoute = require("./router/userRoute")
const cors = require("cors")
require("./model/User")
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute)
db.sync({force:true}).then(()=>console.log("db ok")).catch(()=>console.log("error db"))
app.listen(port, () => {

console.log("server is running on port :- ", port)
})