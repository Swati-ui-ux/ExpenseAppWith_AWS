import React, { use, useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { Navigate } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
const App = () => {
  const [isLogin, setIsLogin] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLogin(!!token);
  }, [])
    if (isLogin === null) {
    return <h2>Loading...</h2>
    }
  let handleLoggedOut = () => {
  setIsLogin(false)
  }
  let handleLogin = () => {
  setIsLogin(true)
  }
  return (
    <div>

      <Routes>
  <Route
    path="/"
   element={isLogin ? <Home onLoggedOut={handleLoggedOut} /> : <Navigate to="/login" />}
  />

 <Route
  path="/login"
  element={!isLogin ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
/>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
        
      </Routes>
      
  
      <ToastContainer/>
    </div>
  )
}

export default App