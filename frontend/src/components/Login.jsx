import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:3000/api/users/login", formData)
      
      localStorage.setItem("token", data.token)
      toast.success("Login successfully")
navigate("/")
      setFormData({ email: "", password: "" })
      console.log(data)

    } catch (error) {
      const msg = error.response?.data?.message || "Login failed"
      console.log(msg)
      toast.error(msg)
    }
  }

  let handleChange = (e) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login User
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Login
              </button>
             <span className="block text-center text-gray-600 mt-4">
  Create new Account{" "}
  <Link 
    to="/signup" 
    className="text-blue-500 font-semibold hover:underline hover:text-blue-600 transition duration-200"
  >
    Sign up
  </Link>
</span>
      </form>
    </div>
  )
}

export default Login