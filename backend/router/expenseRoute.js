const express = require("express")
const { addExpenses } = require("../controller/expenseController")

const router = express.Router()

router.post("/", addExpenses)

module.exports = router