import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para verificar las credenciales
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-3 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-150 ease-in-out w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-150 ease-in-out w-full"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
          <div className="mt-2">
            <span className="text-sm text-gray-600">¿No tienes una cuenta?</span>
            <a href="#" className="text-sm text-blue-600 hover:underline ml-1">
              Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;