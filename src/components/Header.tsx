import { FiBell, FiUser, FiMenu } from 'react-icons/fi'; 

const Header = () => {
  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center">
      <FiMenu className="text-xl cursor-pointer md:hidden" /> {/* Se usa FiMenu para un menú móvil */}
      <h1 className="text-2xl font-bold">HabitHub</h1>
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl cursor-pointer" />
        <FiUser className="text-xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;