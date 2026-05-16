import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../services/api";

export default function ProgressPage() {
  const [students, setStudents] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    surah_completed: "",
    notes: "",
  });

  const fetchData = async () => {
    try {
      const studentsResponse = await api.get("students/");

      const subjectsResponse = await api.get("subjects/");

      setStudents(studentsResponse.data);

      setSubjects(subjectsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("progress/", formData);

      alert("Progress saved");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Progress Tracking</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <select
              name="student"
              className="border p-3"
              onChange={handleChange}
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.full_name}
                </option>
              ))}
            </select>

            <select
              name="subject"
              className="border p-3"
              onChange={handleChange}
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="surah_completed"
            placeholder="Surah Completed"
            className="border p-3 w-full mt-4"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            className="border p-3 w-full mt-4"
            rows="4"
            onChange={handleChange}
          />

          <button className="bg-black text-white px-6 py-3 rounded mt-4">
            Save Progress
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
