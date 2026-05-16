import { useEffect, useState } from "react";

import api from "../services/api";

export default function StudentForm({
  formData,
  setFormData,
  handleSubmit,
  buttonText = "Save Student",
}) {
  const [classes, setClasses] = useState([]);

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

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="border p-3"
          value={formData.full_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="arabic_name"
          placeholder="Arabic Name"
          className="border p-3"
          value={formData.arabic_name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date_of_birth"
          className="border p-3"
          value={formData.date_of_birth}
          onChange={handleChange}
        />

        <input
          type="date"
          name="admission_date"
          className="border p-3"
          value={formData.admission_date}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-3"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>

          <option value="female">Female</option>
        </select>

        <select
          name="school_class"
          className="border p-3"
          value={formData.school_class}
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
        value={formData.notes}
        onChange={handleChange}
      />

      <button className="bg-black text-white px-6 py-3 rounded mt-4">
        {buttonText}
      </button>
    </form>
  );
}
