const { DataTypes } = require("sequelize")
const sequelize = require("../utils/db")

console.log("Expense model loaded 💌💌");
const Expense = sequelize.define("expenses", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    money: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false,
    }
    
}, { timestamps: true })
module.exports = Expense