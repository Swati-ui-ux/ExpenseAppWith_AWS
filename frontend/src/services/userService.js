import api from "../api/axios"

export const getExpense = () => {
 return api.get("/expense")
}

export const postExpense = (expenseData) => {
return api.post("/expense",expenseData)
}