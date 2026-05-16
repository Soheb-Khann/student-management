import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import DocumentUpload from "../../components/DocumentUpload";

import api from "../../services/api";

export default function StudentProfilePage() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);

  const [documents, setDocuments] = useState([]);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`students/${id}/`);

      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await api.get(`documents/?student=${id}`);

      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudent();

    fetchDocuments();
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
        <DocumentUpload studentId={id} onUploadComplete={fetchDocuments} />

        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Documents</h2>

          <div className="space-y-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className="border rounded p-4 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{document.title}</p>

                  <p className="text-sm text-gray-500">
                    {document.document_type}
                  </p>
                </div>

                <a
                  href={document.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
