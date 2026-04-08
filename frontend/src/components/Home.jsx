import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [formData, setFormData] = useState({
        money: "",
        description: "",
        category:""
    })
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
            console.log(data.data)
        } catch (error) {
             const msg = error.response?.data?.message || "Login failed"
            console.log(msg)
        }
    }
    let handleClick = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    let handleChange = (e) => {
        setFormData((pre) => ({
            ...pre,
            [e.target.name] :e.target.value
        }))
    }
  return (
      <div>Home
      <button onClick={handleClick} className='bg-gray-500 py-2 px-4 rounded-md text-white'>Log out</button>
          <form onSubmit={handleSubmit}>
              <h1>Add expenses</h1>
              <input 
                  type="number"
                  name="money" 
                  placeholder='Enter money'
                  onChange={handleChange}
                  value={formData.money}
              />
              
              <input 
                  type="text"
                  name="description" 
                  placeholder='Description'
                  onChange={handleChange}
                  value={formData.description}
              />
              
              
              <select
                  onChange={handleChange}
                  value={formData.value} name='category'>
                  <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              </select>
              <button type='submit'>submit</button>
          </form>
          
      </div>
  )
}

export default Home