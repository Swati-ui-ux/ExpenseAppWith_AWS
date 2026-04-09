import React, { use, useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { Navigate } from 'react-router-dom'
const App = () => {
  const [isLogin, setIsLogin] = useState(null)
 console.log("Is login",isLogin)
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
      </Routes>
      
  
      <ToastContainer/>
    </div>
  )
}

export default App