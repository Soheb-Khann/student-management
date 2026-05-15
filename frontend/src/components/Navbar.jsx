import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    setUser(null);

    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <div>
        <h1 className="font-semibold">Sunday School Management System</h1>
      </div>

      <div className="flex items-center gap-4">
        <span>{user?.username}</span>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
