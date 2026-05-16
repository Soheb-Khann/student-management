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

    fetchDropdownData();
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const submitAttendance = async () => {
    try {
      const attendanceRecords = Object.entries(attendance).map(
        ([studentId, status]) => ({
          student_id: studentId,
          status,
        }),
      );

      await api.post("attendance-submit/", {
        school_class: selectedClass,
        subject: selectedSubject,
        date: new Date().toISOString().split("T")[0],

        attendance_records: attendanceRecords,
      });

      alert("Attendance submitted");
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedClass, setSelectedClass] = useState("");

  const [selectedSubject, setSelectedSubject] = useState("");

  const [classes, setClasses] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const fetchDropdownData = async () => {
    try {
      const classResponse = await api.get("classes/");

      const subjectResponse = await api.get("subjects/");

      setClasses(classResponse.data);

      setSubjects(subjectResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          className="border p-3"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>

          {classes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          className="border p-3"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>

          {subjects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
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
