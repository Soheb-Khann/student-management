import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const deleteStudent = async (id) => {
    const confirmed = window.confirm("Delete this student?");

    if (!confirmed) return;

    try {
      await api.delete(`students/${id}/`);

      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await api.get("students/");

      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Students</h1>

        <button
          onClick={() => navigate("/admin/students/add")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Class</th>

              <th className="text-left p-4">Gender</th>

              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-4">{student.full_name}</td>

                <td className="p-4">{student.school_class_name}</td>

                <td className="p-4">{student.gender}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
