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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Contenedor del formulario de login */}
      <div className="flex flex-col w-full lg:w-1/3 p-4 bg-white shadow-md min-h-screen">
        <div className="flex flex-col items-center justify-center w-full p-2 h-full">
          <div className="flex flex-col items-center w-full max-w-xs space-y-6"> 
            <div className="w-40 h-40 overflow-hidden">
              <img src={logo} alt="Logo"/>
            </div>

            <h2 className="text-2xl text-center text-gray-800">Iniciar Sesión</h2> 

            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div> // Mostrar el mensaje de error
            )}

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  required
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-500 rounded-md shadow appearance-none text-gray-700 leading-tight
                  focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-500 rounded-md shadow appearance-none text-gray-700 leading-tight
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-outline pr-10"
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
                <a href="forgot_password" className="text-blue-500 hover:text-orange-500 text-base 
                  hover:font-bold">Olvidaste tu contraseña?</a>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-orange-500 rounded-md hover:bg-blue-500 hover:font-bold"
                >
                  Ingresar
                </button>
              </div>

              <div className="text-center">
                <span className="text-sm">¿No tienes cuenta? </span>
                <a href="#" className="text-blue-500 hover:text-orange-500 text-base
                    hover:font-bold">Obten HabitHub Ahora</a>
              </div>
            </form>
          </div>
        </div>
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