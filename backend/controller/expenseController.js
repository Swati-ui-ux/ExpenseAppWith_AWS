
const { User } = require("../model")
const Expenses = require("../model/Expense")

const addExpenses = async(req,res) => {
    try {
        const { money, category, description } = req.body
        // const UserId = await User.findByPk(req.user.id)
        // console.log("UserId 💌--💌",UserId)
        console.log("Body", req.body)
        const expense = await Expenses.create({ money, category, description,UserId:req.user.id})
        if (!expense) return res.status(404).json({ message: "expense not added" })
        res.status(201).json({ message: "expense added successfully",expense })
        
    } catch (error) {
        console.log(error)
    res.status(500).json({message:"server error"})
}
}

const getExpenses = async (req, res) => {
    try {
        
        const expense = await Expenses.findAll({ where: { UserId: req.user.id } })
        console.log(expense)
        if (expense.length===0) res.status(404).json({ message: "expense not found" })
        res.status(200).json({message:"expense  found success",expense})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}
let deleteExpenses = async (req, res) => {
  try {
    const { id } = req.params        
    const userId = req.user.id     

    const deleted = await Expenses.destroy({
      where: {
        id: id,
        userId: userId   
      }
    })

    if (!deleted) {
      return res.status(404).json({
        message: "Expense not found"
      })
    }

    return res.status(200).json({
      message: "Expense deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error"
    })
  }
}
module.exports = {addExpenses,getExpenses,deleteExpenses}