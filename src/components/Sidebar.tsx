import { Link } from 'react-router-dom';
import { FiHome, FiList, FiGrid } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold">
        <Link to="/">HabitHub</Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-6">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <FiList className="mr-3" />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              to="/board"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <FiGrid className="mr-3" />
              <span>Board</span>
            </Link>
          </li>
          {/* Agregar más enlaces aquí según sea necesario */}
        </ul>
      </nav>
      <footer className="p-6">
        <p className="text-sm text-gray-400">© 2024 Mr Soft</p>
      </footer>
    </aside>
  );
};

export default Sidebar;