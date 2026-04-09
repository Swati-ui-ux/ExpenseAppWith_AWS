const express = require("express")
const { addExpenses, getExpenses, deleteExpenses } = require("../controller/expenseController")

const router = express.Router()

router.post("/", addExpenses)
router.get("/", getExpenses)
router.delete("/:id",deleteExpenses)
module.exports = router