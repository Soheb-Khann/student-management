import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("accounts/login/", formData);

      localStorage.setItem("access", response.data.access);

      localStorage.setItem("refresh", response.data.refresh);

      const userResponse = await api.get("accounts/me/");

      setUser(userResponse.data);

      if (userResponse.data.role === "admin") {
        navigate("/admin");
      } else if (userResponse.data.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/parent");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-3 mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4"
          onChange={handleChange}
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
