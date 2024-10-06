import { useState } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import fondo from "../assets/images/FondoLogin.png";
import logo from "../assets/images/Grest.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

  // Corregimos el tipo del evento e
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        setLoading(true);

    // Simulamos el envío de correo
        setTimeout(() => {
            setLoading(false);
            setMessage("Se ha enviado un enlace para restablecer la contraseña a tu correo.");
        }, 2000);
    };

return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sección de Imagen */}
        <div className="relative w-full lg:w-2/3 hidden lg:block">
            <img src={fondo} alt="Background" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      
        {/* Sección de Formulario */}
        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md flex flex-col min-h-screen">
            <div className='flex justify-between p-4'>
                <a href="/" className="flex text-orange-500 text-base font-bold hover:text-blue-500">
                    <FiArrowLeft className="mt-1 mr-1 text-lg"/>Regresar
                </a>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-2 h-full">
                <div className="flex flex-col w-full space-y-7 px-4">
                    {/* Logo */}
                    <div className="w-40 h-40 overflow-hidden mx-auto">
                        <img src={logo} alt="Logo"/>
                    </div>

                    {/* Título */}
                    <h2 className="text-2xl text-gray-800 font-bold text-center">¿Olvidaste tu Contraseña?</h2>
                    <span className="text-center text-gray-600">
                        ¡No te preocupes! Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
                    </span>

                    {/* Formulario */}
                    <form className="space-y-6 w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full p-3 border border-gray-500 rounded-md shadow appearance-none text-gray-700 leading-tight
                                focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="usuario@gmail.com"
                                style={{ maxWidth: '100%' }} // Estilo adicional para evitar ancho mayor
                            />
                        </div>
                        
                        {/* Botón Restablecer */}
                        <button
                        type="submit"
                        className={`w-full py-2 text-white bg-orange-500 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:font-bold'}`}
                        disabled={loading}
                        style={{ maxWidth: '100%' }} 
                        >
                        {loading ? "Enviando..." : "Restablecer"}
                        </button>
                    </form>

                    {/* Mensaje de confirmación */}
                    {message && <div className="text-green-500 text-center">{message}</div>}
                </div>
            </div>
            {/* Footer fijo en la parte inferior */}
            <div className="mt-auto text-center text-gray-500 text-sm w-full py-4">
                © 2024 MrSoft Todos los derechos reservados.
            </div>
        </div>
    </div>
    );
};

export default ForgotPassword;