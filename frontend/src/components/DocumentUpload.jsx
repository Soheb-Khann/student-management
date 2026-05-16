import { useState } from "react";

import api from "../services/api";

export default function DocumentUpload({ studentId, onUploadComplete }) {
  const [file, setFile] = useState(null);

  const [documentType, setDocumentType] = useState("certificate");

  const [title, setTitle] = useState("");

  const uploadDocument = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("student", studentId);

    formData.append("document_type", documentType);

    formData.append("title", title);

    formData.append("file", file);

    try {
      await api.post("documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Uploaded");

      setFile(null);

      setTitle("");

      onUploadComplete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Document Title"
          className="border p-3 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border p-3 w-full"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="certificate">Certificate</option>

          <option value="admission_form">Admission Form</option>

          <option value="letter">Letter</option>

          <option value="other">Other</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          onClick={uploadDocument}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
