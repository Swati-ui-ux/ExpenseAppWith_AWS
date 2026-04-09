import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShowData from './ShowData'

const Home = ({onLoggedOut}) => {
    const [formData, setFormData] = useState({
        money: "",
        description: "",
        category:""
    })
    const [dbData, setDbData] = useState([])
   const getData = async () => {
    try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
            "http://localhost:3000/api/expense",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(data.expense);
        setDbData(data.expense);

    } catch (error) {
        console.log(error.response?.data || error.message);
    }
    }
    useEffect(() => {
    getData()
    },[])
    const navigate = useNavigate()
    let handleSubmit = async (e) => {
        
        e.preventDefault()
        
        try {
            const token= localStorage.getItem("token")
            const { data } = await axios.post("http://localhost:3000/api/expense", formData, {
                headers: {
                Authorization:`Bearer ${token}`
                }
            })
            alert("expense added ✅")
            console.log(data.data)
        } catch (error) {
             const msg = error.response?.data?.message || "Login failed"
            console.log(msg)
        }
    }
    let handleClick = () => {
        localStorage.removeItem("token")
        onLoggedOut()
        navigate("/login")
    }
    let handleChange = (e) => {
        setFormData((pre) => ({
            ...pre,
            [e.target.name] :e.target.value
        }))
    }
    return (
        <div>
                  <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add Expense
                    </h1>

                    <button
                        onClick={handleClick}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                    >
                        Logout
                    </button>
                </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                  type="number"
                  name="money" 
                  placeholder='Enter money'
                  onChange={handleChange}
                  value={formData.money}
                   className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              
              <input 
                  type="text"
                  name="description" 
                  placeholder='Description'
                  onChange={handleChange}
                  value={formData.description}
                   className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              
              
              <select
                  onChange={handleChange}
                  value={formData.category} name='category'
               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              </select>
              <button
                  type='submit'
                   className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >submit</button>
            </form>
</div>
            <ShowData dbData={dbData}/>
</div>
          
  )
}

export default Home