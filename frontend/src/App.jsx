import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import AddStudentPage from "./pages/admin/AddStudentPage";
import EditStudentPage from "./pages/admin/EditStudentPage";
import AttendancePage from "./pages/teacher/AttendancePage";
import StudentProfilePage from "./pages/admin/StudentProfilePage";
import MarksPage from "./pages/teacher/MarksPage";
import ProgressPage from "./pages/teacher/ProgressPage";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute user={user}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent"
        element={
          <ProtectedRoute user={user}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute user={user}>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students/add"
        element={
          <ProtectedRoute user={user}>
            <AddStudentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students/:id/edit"
        element={
          <ProtectedRoute user={user}>
            <EditStudentPage />
          </ProtectedRoute>
        }
      />
      <Route path="/teacher/attendance" element={<AttendancePage />} />
      <Route path="/admin/attendance" element={<AttendancePage />} />

      <Route
        path="/admin/students/:id"
        element={
          <ProtectedRoute user={user}>
            <StudentProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/marks"
        element={
          <ProtectedRoute user={user}>
            <MarksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/progress"
        element={
          <ProtectedRoute user={user}>
            <ProgressPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/marks"
        element={
          <ProtectedRoute user={user}>
            <MarksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/progress"
        element={
          <ProtectedRoute user={user}>
            <ProgressPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
