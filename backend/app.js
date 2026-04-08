const express = require("express")
const app = express()
const port = 3000
const db = require("./utils/db")
const cors = require("cors")


const userRoute = require("./router/userRoute")
const expenseRoute = require("./router/expenseRoute")
const authemiddleware = require("./middleware/authMiddleware")
require("./model")
const expenses = require("./model/Expense")
const user = require("./model/User")
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/expense",authemiddleware,expenseRoute)
db.sync({alter:true}).then(()=>console.log("db ok")).catch(()=>console.log("error db"))
app.listen(port, () => {

console.log("server is running on port :- ", port)
})