import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    let handleClick = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
  return (
      <div>Home
      <button onClick={handleClick} className='bg-gray-500 py-2 px-4 rounded-md text-white'>Log out</button>
      </div>
  )
}

export default Home