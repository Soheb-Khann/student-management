import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../services/api";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState({});

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

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const submitAttendance = async () => {
    console.log(attendance);

    alert("Attendance submission API next");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>

      <div className="bg-white shadow rounded-lg p-6">
        {students.map((student) => (
          <div key={student.id} className="flex justify-between border-b py-4">
            <span>{student.full_name}</span>

            <select
              className="border p-2"
              onChange={(e) =>
                handleAttendanceChange(student.id, e.target.value)
              }
            >
              <option value="present">Present</option>

              <option value="absent">Absent</option>

              <option value="late">Late</option>
            </select>
          </div>
        ))}

        <button
          onClick={submitAttendance}
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >
          Submit Attendance
        </button>
      </div>
    </DashboardLayout>
  );
}
