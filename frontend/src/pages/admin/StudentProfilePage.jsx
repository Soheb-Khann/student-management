import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../services/api";

export default function StudentProfilePage() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`students/${id}/`);

      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex gap-6">
          <div>
            {student.photo ? (
              <img
                src={student.photo_url}
                alt=""
                className="w-40 h-40 rounded-lg object-cover"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-lg" />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{student.full_name}</h1>

            <p className="mt-2">Class: {student.school_class_name}</p>

            <p>Gender: {student.gender}</p>

            <p>Arabic Name: {student.arabic_name}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
