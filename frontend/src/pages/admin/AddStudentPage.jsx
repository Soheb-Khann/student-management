import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../services/api";

export default function AddStudentPage() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    arabic_name: "",
    gender: "male",
    date_of_birth: "",
    admission_date: "",
    school_class: "",
    family: "",
    notes: "",
    active: true,
  });

  const fetchClasses = async () => {
    try {
      const response = await api.get("classes/");

      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
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
      await api.post("students/", formData);

      navigate("/admin/students");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Add Student</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="border p-3"
              onChange={handleChange}
            />

            <input
              type="text"
              name="arabic_name"
              placeholder="Arabic Name"
              className="border p-3"
              onChange={handleChange}
            />

            <input
              type="date"
              name="date_of_birth"
              className="border p-3"
              onChange={handleChange}
            />

            <input
              type="date"
              name="admission_date"
              className="border p-3"
              onChange={handleChange}
            />

            <select
              name="gender"
              className="border p-3"
              onChange={handleChange}
            >
              <option value="male">Male</option>

              <option value="female">Female</option>
            </select>

            <select
              name="school_class"
              className="border p-3"
              onChange={handleChange}
            >
              <option value="">Select Class</option>

              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="notes"
            placeholder="Notes"
            className="border p-3 w-full mt-4"
            rows="4"
            onChange={handleChange}
          />

          <button className="bg-black text-white px-6 py-3 rounded mt-4">
            Save Student
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
