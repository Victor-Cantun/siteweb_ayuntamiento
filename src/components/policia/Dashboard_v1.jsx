import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Progress } from "flowbite-react";
import axios from 'axios';
const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const UploadPDF = ({ label, fieldName, iduser, type }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (file) => {
    if (file && file.type === 'application/pdf' && file.size <= 512000) {
      setFile(file);
      setError('');
    } else {
      setError('El archivo debe ser un PDF menor a 500KB');
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);
    formData.append('user', iduser);
    formData.append('type', type);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/police/upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        }
      });

      if (response.status === 200) {
        setUploaded(true);
        setError('');
      }
    } catch (err) {
      setError('Error al subir el archivo.'+err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        {file ? (
          <p className="text-green-600">{file.name}</p>
        ) : (
          <p>Arrastra un archivo PDF aquí o haz clic para seleccionar uno</p>
        )}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="hidden"
          id={`input-${fieldName}`}
        />
      </div>
      <label htmlFor={`input-${fieldName}`} className="block mt-2 text-blue-600 cursor-pointer text-sm">
        Seleccionar archivo
      </label>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {progress > 0 && progress < 100 && <Progress value={progress} className="mt-2" />}

      {uploaded ? (
        <p className="text-green-600 mt-2">Archivo subido. <button className="underline text-blue-600" onClick={() => setUploaded(false)}>Editar</button></p>
      ) : (
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={!file}
        >
          Subir
        </button>
      )}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hola, {user?.first_name || user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bienvenido
            </h2>
            <p className="text-gray-600 mb-4">
              Esta es una página protegida que solo pueden ver los usuarios autenticados.
            </p>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tu información:</h3>
              <ul className="text-gray-600">
                <li><strong>Email:</strong> {user?.email}</li>
                <li><strong>Nombre:</strong> {user?.first_name} {user?.last_name}</li>
                <li><strong>Miembro desde:</strong> {new Date(user?.date_joined).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Carga los documentos solicitados
            </h2>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tu información:</h3>
              <div className="space-y-6 p-6">
                  <UploadPDF label="Acta de nacimiento" fieldName="pdf1" iduser={user?.id} type={1} />
                  <UploadPDF label="Curriculum Vitae" fieldName="pdf2" iduser={user?.id} type={2} />
                  <UploadPDF label="CURP" fieldName="pdf3" iduser={user?.id} type={3} />
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;