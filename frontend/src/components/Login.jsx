import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ onLogin}) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword,setShowPassword] = useState(false)
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:3000/api/users/login", formData)
      console.log(data)
      localStorage.setItem("token", data.token)
      console.log("Token", data.token)
       onLogin() 
      navigate("/")
      
      toast.success("Login successfully")
      setFormData({ email: "", password: "" })
      // console.log(data)

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

  let handleShowPassword = () => {
  setShowPassword((pre)=>!pre)
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
        <div  className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 flex justify-between focus:ring-green-400" >
        <input
          type={showPassword?"text":"password"}
          placeholder="Enter Password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className='outline-none'
        />
        <span onClick={handleShowPassword} className='cursor-pointer'>{showPassword?"🙈":"👁️"}</span>
        </div>
        <div>Forgot password <Link to='/forgot'>Click</Link></div>
        <button
          type="submit"
          className="w-full bg-green-500 mt-2 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
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