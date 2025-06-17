import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ 
  type, 
  title, 
  existingFile, 
  onUpload, 
  onEdit, 
  onDelete,
  disabled = false 
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  //campo extra de licencia
  const [utilityType, setUtilityType] = useState('');
  const [showUtilityQuestion, setShowUtilityQuestion] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const validateFile = (file) => {
    // Validar tipo de archivo
    if (file.type !== 'application/pdf') {
      throw new Error('Solo se permiten archivos PDF');
    }
    
    // Validar tamaño (5MB = 5242880 bytes)
    if (file.size > 5242880) {
      throw new Error('El archivo no puede ser mayor a 5MB');
    }
    
    return true;
  };

  const handleFileUpload = async (file) => {
    try {
      validateFile(file);
      // Si es tipo 3 y no hay archivo existente, mostrar pregunta
      if (type === 7 && !existingFile) {
        setPendingFile(file);
        setShowUtilityQuestion(true);
        return;
      }
      await uploadFile(file, existingFile?.utility_type || '');
      setUploading(true);
      setProgress(0);

      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      await onUpload(file, type);
      
/*       clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setProgress(0);
        setUploading(false);
      }, 500); */
      
    } catch (error) {
      //setUploading(false);
      //setProgress(0);
      alert(error.message || 'Error al subir el archivo');
    }
  };

    const uploadFile = async (file, selectedUtilityType = '') => {
    setUploading(true);
    setProgress(0);

    // Simular progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      await onUpload(file, type, selectedUtilityType);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setProgress(0);
        setUploading(false);
        setShowUtilityQuestion(false);
        setPendingFile(null);
        setUtilityType('');
      }, 500);
      
    } catch (error) {
      clearInterval(progressInterval);
      setUploading(false);
      setProgress(0);
      setShowUtilityQuestion(false);
      setPendingFile(null);
      throw error;
    }
  };

    const handleUtilitySubmit = () => {
    if (!utilityType) {
      alert('Por favor selecciona el tipo de comprobante');
      return;
    }
    uploadFile(pendingFile, utilityType);
  };

  const handleUtilityCancel = () => {
    setShowUtilityQuestion(false);
    setPendingFile(null);
    setUtilityType('');
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles[0]);
    }
  }, [type, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: disabled || uploading
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const formatFileSize = (sizeInMB) => {
    // sizeInMB ya viene en MB desde el backend
    if (!sizeInMB || isNaN(sizeInMB)) {
      return '0 KB';
    }
    
    if (sizeInMB >= 1) {
      return sizeInMB.toFixed(2) + ' MB';
    } else {
      return (sizeInMB * 1024).toFixed(2) + ' KB';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border mb-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {existingFile ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Archivo subido</p>
                <p className="text-xs text-green-700">
                  {existingFile.original_name} ({formatFileSize(existingFile.file_size * 1024 * 1024)})
                </p>
                <p className="text-xs text-green-600">
                  Subido: {formatDate(existingFile.uploaded_at)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(existingFile)}
                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(existingFile)}
                className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
              >
                Eliminar
              </button>
            </div>
          </div>
          
          {/*<button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Reemplazar archivo
          </button> */}
        </div>
      ) : (
        <div>
          <div
            {...getRootProps()}
            className={`
              relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled || uploading}
            />
            
            <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {isDragActive ? (
                  "Suelta el archivo aquí..."
                ) : (
                  <>
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Haz clic para seleccionar
                    </span>{" "}
                    o arrastra y suelta
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Solo archivos PDF, máximo 5MB
              </p>
            </div>
          </div>
          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Subiendo archivo...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

        </div>

      )}
      {/* Pregunta para tipo de comprobante - solo para tipo 3 */}
      {showUtilityQuestion && type === 7 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-3">
            ¿Sabes manejar vehículo?
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="utilityType"
                value="si"
                checked={utilityType === 'si'}
                onChange={(e) => setUtilityType(e.target.value)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-blue-800">Si</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="utilityType"
                value="no"
                checked={utilityType === 'no'}
                onChange={(e) => setUtilityType(e.target.value)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-blue-800">No</span>
            </label>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleUtilitySubmit}
              disabled={!utilityType || uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Continuar
            </button>
            <button
              onClick={handleUtilityCancel}
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
          
          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Subiendo archivo...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;