import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../services/api";

export default function MarksPage() {
  const [students, setStudents] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    exam_type: "exam",
    exam_name: "",
    marks_obtained: "",
    total_marks: "",
    semester: "",
    remarks: "",
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
      await api.post("marks/", formData);

      alert("Marks saved");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Enter Marks</h1>

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

            <input
              type="text"
              name="exam_name"
              placeholder="Exam Name"
              className="border p-3"
              onChange={handleChange}
            />

            <select
              name="exam_type"
              className="border p-3"
              onChange={handleChange}
            >
              <option value="exam">Exam</option>

              <option value="quiz">Quiz</option>

              <option value="assignment">Assignment</option>
            </select>

            <input
              type="number"
              name="marks_obtained"
              placeholder="Marks Obtained"
              className="border p-3"
              onChange={handleChange}
            />

            <input
              type="number"
              name="total_marks"
              placeholder="Total Marks"
              className="border p-3"
              onChange={handleChange}
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              className="border p-3"
              onChange={handleChange}
            />
          </div>

          <textarea
            name="remarks"
            placeholder="Remarks"
            className="border p-3 w-full mt-4"
            rows="4"
            onChange={handleChange}
          />

          <button className="bg-black text-white px-6 py-3 rounded mt-4">
            Save Marks
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
