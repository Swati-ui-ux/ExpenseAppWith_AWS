import React from 'react'
import SignUp from './components/SignUp'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'
const App = () => {
  return (
    <div>
      <SignUp />
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App