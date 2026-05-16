import { Bell, LogOut } from "lucide-react";

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
    <header className="bg-white border-b px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Welcome back</h2>

        <p className="text-slate-500 text-sm">Manage your school efficiently</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell className="text-slate-600" size={20} />

          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full" />
        </button>

        <div className="text-right">
          <p className="font-medium text-slate-800">{user?.username}</p>

          <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
        </div>

        <button
          onClick={logout}
          className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
