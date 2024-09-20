import { FiHome, FiList, FiGrid, FiCalendar } from 'react-icons/fi'; 
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Mr Soft</h2>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-6">
            <Link to="/" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
              <FiHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/tasks" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
              <FiList className="mr-3" /> Tasks
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/board" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
              <FiGrid className="mr-3" /> Board
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/cronograma" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
              <FiCalendar className="mr-3" /> Cronograma
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;