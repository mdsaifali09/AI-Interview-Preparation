import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      login(data.token, data.user);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center">

        <div className="text-white p-10">

          <h1 className="text-6xl font-bold mb-5">
            AI Interview Prep Pro
          </h1>

          <p className="text-xl">
            Crack Interviews with AI Powered Mock Sessions,
            Resume Analysis and Smart Recommendations.
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center bg-slate-950">

        <form
          onSubmit={handleSubmit}
          className="w-[400px] bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20"
        >

          <h2 className="text-3xl text-white font-bold text-center mb-8">
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl mb-4 bg-slate-800 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl mb-4 bg-slate-800 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="text-gray-300 mt-5 text-center">
            Don't have an account?

            <Link
              to="/register"
              className="text-blue-400 ml-2"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;