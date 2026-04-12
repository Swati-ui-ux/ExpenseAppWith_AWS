import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShowData from './ShowData'
import { getExpense, postExpense } from '../services/userService'

const Home = ({onLoggedOut}) => {
    const [formData, setFormData] = useState({
        money: "",
        description: "",
        category:""
    })
    const [dbData, setDbData] = useState([])
    
   const getData = async () => {
    try {
        const { data } = await getExpense();
        console.log(data)
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
            const { data } = await postExpense(formData)
            alert("expense added ✅")
            getData()
            setFormData({
        money: "",
        description: "",
        category:""
    })
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
        <div className='m-2'>
            <h1 className='text-2xl font-bold text-center border-b-2
'>Expense App</h1>
                  <div className="bg-white shadow-lg rounded-2xl p-8 m-auto w-full max-w-md">
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
                        required
                  placeholder='Enter money'
                  onChange={handleChange}
                  value={formData.money}
                   className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              
              <input 
                        type="text"
                        required
                        
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
                        required
                        
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