const Expenses = require("./Expense")
const User = require("./User")
const db= require("../utils/db")
User.hasMany(Expenses)
Expenses.belongsTo(User)

module.exports = {db,User,Expenses}