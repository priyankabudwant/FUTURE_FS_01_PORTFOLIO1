import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ThemeToggle/>
      <StarBackground/>
      <form onSubmit={login} className="w-96 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
