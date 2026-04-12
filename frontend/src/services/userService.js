import api from "../api/axios"

export const getExpense = () => {
 return api.get("/expense")
}

export const postExpense = (expenseData) => {
return api.post("/expense",expenseData)
}

export const genratText = (data) => {
return api.post("/genret",data)
}