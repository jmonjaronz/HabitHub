import React from 'react';
import { FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  return (
    <div className="relative">
      {/* Flecha del dropdown con sombra */}
      <div className="absolute right-5 top-[-8px] w-4 h-4 bg-white transform rotate-45 border-t-2 border-l-2 border-gray-500 shadow-md"></div>
      
      {/* Contenedor del menú dropdown con animación */}
      <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg z-[1002] border-2 border-gray-500 transition-transform transform scale-95 origin-top-right duration-300 ease-in-out">
        <ul className="list-none p-0 m-0">
          <li className="flex items-center py-2 px-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100">
            <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100">
              <FaUser className="mr-2 text-xl" /> <span>Perfil</span>
            </button>
          </li>
          <li className="flex items-center py-2 px-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100">
            <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100">
              <FaLock className="mr-2 text-xl" /> <span>Cambiar clave</span>
            </button>
          </li>
          <li className="flex items-center py-2 px-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100">
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-2 text-xl" /> <span>Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;