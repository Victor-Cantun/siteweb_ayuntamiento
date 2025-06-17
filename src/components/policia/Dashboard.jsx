import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { documentsAPI } from '../../services/api';
import FileUpload from './FileUpload';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [documents, setDocuments] = useState({1: null, 2: null, 3: null, 4:null, 5:null, 6:null, 7:null, 8:null, 9:null, 10:null, 11:null});
  const [loading, setLoading] = useState(true);

  const documentTypes = {
    1: 'Acta de nacimiento',
    2: 'Curriculum Vitae',
    3: 'CURP',
    4: 'RFC',
    5: 'IMSS',
    6: 'INE',
    7: 'Licencia de manejo',
    8: 'Cartilla de servicio militar',
    9: 'Certificado de estudios',
    10: 'Comprobante de domicilio',
    11: 'Fotografía de frente',
  };

  useEffect(() => {
    loadUserDocuments();
  }, []);

  const loadUserDocuments = async () => {
    try {
      const response = await documentsAPI.getUserDocuments();
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error al cargar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, type, utilityType = '') => {
    try {
      const response = await documentsAPI.uploadDocument(file, type, utilityType);
      
      // Actualizar el estado local
      setDocuments(prev => ({
        ...prev,
        [type]: response.data.document
      }));
      
      alert(response.data.message);
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 
        error.response?.data?.document?.[0] || 
        error.response?.data?.utility_type?.[0] ||
        'Error al subir el archivo'
      );
    }
  };

  const handleFileEdit = async (documentData) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          // Validar archivo
          if (file.type !== 'application/pdf') {
            throw new Error('Solo se permiten archivos PDF');
          }
          if (file.size > 5242880) {
            throw new Error('El archivo no puede ser mayor a 5MB');
          }

          const response = await documentsAPI.updateDocument(documentData.id, file);
          const updatedDocument = response.data;
          //console.log('Documento anterior:',documentData.type);
          //console.log('Documento actualizado:',response.data);
          // Actualizar el estado local
          setDocuments(prev => ({
            ...prev,
            [documentData.type]: updatedDocument
          }));
          
          alert('Documento actualizado exitosamente');
        } catch (error) {
          alert(error.message || 'Error al actualizar el archivo');
        }
      }
    };
    
    input.click();
  };

  const handleFileDelete = async (documentData) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este documento?')) {
      try {
        await documentsAPI.deleteDocument(documentData.id);
        
        // Actualizar el estado local
        setDocuments(prev => ({
          ...prev,
          [documentData.type]: null
        }));
        
        alert('Documento eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el documento');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-sm md:text-lg font-semibold">Aspirantes a la Policía Municipal de Proximidad</h1>
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
        <div className="px-4 py-4 sm:px-0">
          <div className="mb-4">
            {/*<h2 className="text-2xl font-bold text-gray-900 mb-2">
              Gestión de Documentos
            </h2> */}
            <p className="text-gray-600">
              Sube tus documentos en formato PDF (máximo 5MB cada uno)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
            {/* cargar de archivos */}
            <div className="md:col-span-2 lg:col-span-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(type => (
                <FileUpload
                  key={type}
                  type={type}
                  title={documentTypes[type]}
                  existingFile={documents[type]}
                  onUpload={handleFileUpload}
                  onEdit={handleFileEdit}
                  onDelete={handleFileDelete}
                />
              ))}
            </div>
            {/* archivos cargados */}
            <div className="">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Resumen de Documentos
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map(type => {
                    const doc = documents[type];
                    return (
                      <div key={type} className="flex flex-wrap p-4 border rounded-lg">
                        <h4 className="w-2/3 font-medium text-sm text-gray-900 mb-2">
                          {documentTypes[type]}
                        </h4>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doc 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doc ? 'Subido' : 'Pendiente'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;