import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:3000/api/users/login", formData)
            localStorage.setItem("token",data.token)
            console.log(data)
            toast.success("login successfully")
            setFormData({ email: "", password: "" })
            console.log(data)
        } catch (error) {
            console.log("Error--", error.response?.data?.message)
        }
        // console.log(formData)
    }
    let handleChange = (e) => {
        setFormData((pre) => ({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }
  return (
      <form onSubmit={handleSubmit}>
          <h1>Login User</h1>
          
          <input
              type="email"
              placeholder='Enter Email'
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
          />
          <input
              type="password"
              required
              placeholder='Enter Password'
              name="password"
              value={formData.password}
              onChange={handleChange}
          />
      
          <button type='submit'>Submit</button>
      </form>
  )
}

export default Login