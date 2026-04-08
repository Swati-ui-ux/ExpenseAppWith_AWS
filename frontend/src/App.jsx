import React from 'react'
import UserForm from './components/UserForm'
import {ToastContainer} from "react-toastify"
const App = () => {
  return (
    <div>
      <UserForm />
      <ToastContainer/>
    </div>
  )
}

export default App