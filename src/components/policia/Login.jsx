import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
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

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    
  <>
    <Navbar fluid rounded className='w-full absolute t-0 left-0 right-0'>
      <NavbarBrand as={Link} href="/">
        <img src="/logo-2.png" className="mr-3 h-6 sm:h-9" alt="H. Ayuntamiento de Escárcega" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Inicio
        </NavbarLink>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/register">Registrarse</Link>
      </NavbarCollapse>
    </Navbar>

    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <figure className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <a href="/"><img alt="H.Ayuntamiento de Escárcega" src="/logo-2.png" className="mx-auto h-32 w-auto" /></a>
          </figure>
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
            <div className="flex items-center py-3">
              <h3 className="text-mb font-semibold">Aspirantes a la Policía Municipal de Proximidad</h3>
            </div>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
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
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
          
          <div className="text-center">
            <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default Login;