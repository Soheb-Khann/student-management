import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import StudentForm from "../../components/StudentForm";

import api from "../../services/api";

export default function EditStudentPage() {
  const { id } = useParams();

  const navigate = useNavigate();

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

  const fetchStudent = async () => {
    try {
      const response = await api.get(`students/${id}/`);

      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`students/${id}/`, formData);

      navigate("/admin/students");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Edit Student</h1>

        <StudentForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          buttonText="Update Student"
        />
      </div>
    </DashboardLayout>
  );
}
