import React, { use, useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
const App = () => {
  const [isLogin, setIsLogin] = useState(null)
 console.log(isLogin)
  useEffect(() => {
  setIsLogin(localStorage.getItem("token"))
  })
  return (
    <div>

      <Routes>
        {isLogin &&
          <Route
            path='/'
          element={
            isLogin?
            <Home />:<Login/>} />}


          <Route path='/login' element={ <Login />} />
      <Route path='/signup' element={<SignUp/>}/>
      </Routes>
  
      <ToastContainer/>
    </div>
  )
}

export default App