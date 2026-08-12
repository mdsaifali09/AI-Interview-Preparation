import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20"
      >

        <h2 className="text-3xl text-white text-center font-bold mb-8">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-xl mb-4 bg-slate-800 text-white outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-5 text-gray-300">
          Already have an account?

          <Link
            to="/"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;