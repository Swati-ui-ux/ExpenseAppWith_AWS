import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate ,Link} from 'react-router-dom'
const UserForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
 const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:3000/api/users/signup", formData)
      toast.success("User added successfully")
        setFormData({ name: "", email: "", password: "" })
        navigate("/")
      console.log(data.data)
    } catch (error) {
      console.log("Error--", error.response?.data?.message)
      toast.error(error.response?.data?.message)
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
          User Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
              </button>
              <span className="block text-center text-gray-600 mt-4">
  Login if already sign up{" "}
  <Link 
    to="/login" 
    className="text-blue-500 font-semibold hover:underline hover:text-blue-600 transition duration-200"
  >
    login
  </Link>
</span>
      </form>
    </div>
  )
}

export default UserForm