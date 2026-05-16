import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">SMS</h1>

      <nav className="space-y-4">
        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="block hover:text-gray-300">
              Dashboard
            </Link>

            <Link to="/admin/students" className="block hover:text-gray-300">
              Students
            </Link>

            <Link to="/admin/attendance" className="block hover:text-gray-300">
              Attendance
            </Link>

            <Link to="/admin/marks" className="block hover:text-gray-300">
              Marks
            </Link>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Link to="/teacher" className="block hover:text-gray-300">
              Dashboard
            </Link>

            <Link to="/teacher/students" className="block hover:text-gray-300">
              Students
            </Link>

            <Link
              to="/teacher/attendance"
              className="block hover:text-gray-300"
            >
              Attendance
            </Link>

            <Link to="/teacher/marks" className="block hover:text-gray-300">
              Marks
            </Link>

            <Link to="/teacher/progress" className="block hover:text-gray-300">
              Progress
            </Link>
          </>
        )}

        {user?.role === "parent" && (
          <>
            <Link to="/parent" className="block hover:text-gray-300">
              Dashboard
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
