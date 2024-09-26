import { useState } from 'react';
import { FiBell, FiUser, FiMenu, FiLock, FiSettings, FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  username: string; // Prop para el nombre de usuario
}

const Header = ({ username }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center">
      <FiMenu className="text-xl cursor-pointer md:hidden" />
      <h1 className="text-2xl font-bold">HabitHub</h1>
      <div className="relative flex items-center">
        <FiBell className="text-xl cursor-pointer mr-4" />
        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
          <FiUser className="text-xl" />
          <span className="ml-2 text-gray-700">{username}</span>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-[1002]">
            <ul className="list-none p-0 m-0">
              <li className="flex items-center py-2 px-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100">
                <FiLock className="mr-2.5" />
                <span>Cambiar contraseña</span>
              </li>
              <li className="flex items-center py-2 px-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100">
                <FiSettings className="mr-2.5" />
                <span>Configuración</span>
              </li>
              <li className="flex items-center py-2 px-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100">
                <FiLogOut className="mr-2.5" />
                <span>Cerrar sesión</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;