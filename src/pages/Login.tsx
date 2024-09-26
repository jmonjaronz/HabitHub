import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import fondoLogin from '../assets/images/FondoLogin.png';
import logo from '../assets/images/Grest.png';

const Login: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'Martín Ampuero' && password === 'password') {
      onLogin(username);
      navigate('/dashboard');
    } else {
      setErrorMessage('Credenciales incorrectas'); 
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Contenedor del formulario de login */}
      <div className="flex flex-col justify-center items-center lg:w-1/3 p-5 bg-white rounded-lg shadow-md space-y-6 max-w-md mx-auto"> 
        <div className="rounded-full w-36 h-36 shadow-lg mb-3 overflow-hidden">
          <img src={logo} alt="Logo" className="object-cover" />
        </div>

        <h2 className="text-2xl text-center text-gray-800">Iniciar Sesión</h2> 

        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div> // Mostrar el mensaje de error
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5 px-10">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mt-1 absolute inset-y-12 right-3 flex items-center"
            >
              {showPassword ? <FiEyeOff className="text-xl text-gray-500" /> : <FiEye className="text-xl text-gray-500" />}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <a href="#" className="text-blue-600 hover:underline text-sm">Olvidaste tu contraseña?</a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Ingresar
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm">¿No tienes cuenta? </span>
            <a href="#" className="text-blue-600 hover:underline text-sm">Obten HabitHub Ahora</a>
          </div>
        </form>

        <div className="mt-auto text-center text-gray-500 text-sm">
          © 2024 Mr Soft. Todos los derechos reservados.
        </div>
      </div>

      {/* Sección para la imagen o color a la derecha */}
      <div className="relative w-full hidden md:block lg:w-2/3">
        <img src={fondoLogin} alt="Background" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Login;