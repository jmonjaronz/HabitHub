import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import { FaUser, FaBell, FaChevronDown } from 'react-icons/fa';
import logo from '../assets/images/Grest.png';

interface HeaderProps {
  username: string; // Prop para el nombre de usuario
}

const Header = ({ username }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Uso de pointerdown en lugar de mousedown para manejar mejor el clic fuera en móviles
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center relative">
      <div className="flex items-center space-x-2 ms-2">
        <img src={logo} alt="Logo" className="w-9 h-9" />
        <h1 className="text-2xl font-bold">HabitHub</h1>
      </div>
      <div className="relative flex items-center">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-600 mr-4">
          <FaBell className="text-xl text-white cursor-pointer" />
        </div>
        <div className="flex items-center cursor-pointer flex-row gap-2 ml-auto md:w-[220px] h-[50px] md:justify-start"
          onClick={toggleDropdown}
          aria-expanded={showDropdown}
          aria-haspopup="true"
          aria-label="Menú de usuario"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-600 cursor-pointer">
            <FaUser className="text-xl text-white" />
          </div>
          <span className="hidden md:block ml-2 text-gray-700">{username}</span>
          <FaChevronDown className="hidden md:block ml-2 text-orange-600 text-xl" />
        </div>
        {/* Dropdown para el menú del usuario */}
        <div
          ref={dropdownRef}
          className={`dropdown absolute top-full right-2 transition-all duration-300 ease-in-out transform ${
            showDropdown ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-[-10px]'
          }`}
        >
          <DropdownMenu onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;