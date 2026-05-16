import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import clsx from "clsx";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  const linkClass = (path) =>
    clsx(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
      location.pathname === path
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-200",
    );

  return (
    <aside className="w-72 bg-white border-r min-h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900">Sunday School</h1>

        <p className="text-slate-500 text-sm mt-1">Management System</p>
      </div>

      <nav className="space-y-2">
        {user?.role === "admin" && (
          <>
            <Link to="/admin" className={linkClass("/admin")}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link to="/admin/students" className={linkClass("/admin/students")}>
              <Users size={18} />
              Students
            </Link>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Link to="/teacher" className={linkClass("/teacher")}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/teacher/attendance"
              className={linkClass("/teacher/attendance")}
            >
              <ClipboardCheck size={18} />
              Attendance
            </Link>

            <Link to="/teacher/marks" className={linkClass("/teacher/marks")}>
              <GraduationCap size={18} />
              Marks
            </Link>

            <Link
              to="/teacher/progress"
              className={linkClass("/teacher/progress")}
            >
              <BookOpen size={18} />
              Progress
            </Link>
          </>
        )}

        {user?.role === "parent" && (
          <Link to="/parent" className={linkClass("/parent")}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        )}
      </nav>
    </aside>
  );
}
