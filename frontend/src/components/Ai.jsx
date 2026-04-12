import React, { useState } from 'react';
import axios from "axios"
const Ai = () => {
  const [text, setText] = useState('');

  let handleSubmit = async(e) => {
      e.preventDefault();
      try {
          let res = await axios.post("http://localhost:3000/api/users/genret", {text});
          
          console.log(res)
      } catch (error) {
        console.log("Error  in ai",error)
      }
    console.log(text);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          AI Generator
        </h2>

        <div className="border border-gray-300 rounded-lg px-3 py-2 mb-4">
          <input
            type="text"
            name="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Generate
        </button>

      </form>

    </div>
  );
};

export default Ai;