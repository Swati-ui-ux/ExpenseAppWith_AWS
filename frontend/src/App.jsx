import React, { use, useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { Navigate } from 'react-router-dom'
const App = () => {
  const [isLogin, setIsLogin] = useState(null)
 console.log(isLogin)
  useEffect(() => {
  setIsLogin(localStorage.getItem("token"))
  })
  return (
    <div>

      <Routes>
  <Route
    path="/"
    element={isLogin ? <Home /> : <Navigate to="/" />}
  />

  <Route
    path="/login"
    element={!isLogin ? <Login /> : <Navigate to="/" />}
  />

  <Route path="/signup" element={<SignUp />} />
      </Routes>
      
  
      <ToastContainer/>
    </div>
  )
}

export default App