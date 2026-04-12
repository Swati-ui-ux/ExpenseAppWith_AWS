import axios from "axios";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/forgot", {
        email,
      });
      alert("Reset link sent to your email");
    } catch (error) {
        console.log(error.response?.data)
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-87.5">
        
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>
        
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your email to receive a reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;