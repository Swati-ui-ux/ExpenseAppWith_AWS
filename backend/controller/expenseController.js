
const Expenses = require("../model/Expense")

const addExpenses = async(req,res) => {
    try {
        const { money, category, description } = req.body
        console.log("Body", req.body)
        const expense = await Expenses.create({ money, category, description,userId :req.user.id})
        if(!expense) return res.status(404).json({message:"expense not added"})
        res.status(201).json({ message: "expense added successfully",expense })
        
    } catch (error) {
        console.log(error)
    res.status(500).json({message:"server error"})
}
}

module.exports = {addExpenses}