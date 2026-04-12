import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token) return alert("Invalid or expired link");
    if (!password) return alert("Password required");
    if (password.length < 6) return alert("Min 6 characters required");

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:3000/api/users/reset/${token}`,
        { password }
      );

      alert("Password updated successfully");
      navigate("/login");

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white p-8 rounded-2xl shadow-lg w-87.5"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your new password below
        </p>

        <div className="border border-gray-300 rounded-lg px-3 py-2 mb-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>

    </div>
  );
}

export default ResetPassword


// AIzaSyAIAvCXcLeBPGdS1PcjS7k_jdL08yidabk