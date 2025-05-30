import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="password_confirm"
              name="password_confirm"
              type="password"
              required
              value={formData.password_confirm}
              onChange={handleChange}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Crear Cuenta'}
            </button>
          </div>
          
          <div className="text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;