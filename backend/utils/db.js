const { Sequelize} =require("sequelize")

const sequelize = new Sequelize("expense_app", "root", "root123", {
    host: "localhost",
    dialect: "mysql"
    
})
    ; (async () => {
    try {
        await sequelize.authenticate()
        console.log("Db connected ")
    } catch (error) {
        console.log("Error in db")
    }

})()

module.exports = sequelize