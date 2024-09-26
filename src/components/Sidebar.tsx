import { FaHome, FaList, FaTh, FaCalendar } from 'react-icons/fa'; 
import { Link, useLocation } from 'react-router-dom'; 

const Sidebar = () => {
  const location = useLocation(); // Obtiene la ubicación actual

  return (
    <div className="hidden sm:flex flex-col w-64 min-h-screen bg-gray-800 text-white p-5">
      <div>
        <h2 className="text-2xl font-bold mb-6">Mr Soft</h2>
        <nav className="mt-10">
          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard"
                aria-label="Ir al Dashboard"
                className={`flex items-center p-2 rounded ${location.pathname === '/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <FaHome className="mr-3 text-xl font-bold" /> <span className="text-base">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasksmanager"
                aria-label="Ir a Tasks"
                className={`flex items-center p-2 rounded ${location.pathname === '/tasksmanager' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <FaList className="mr-3 text-xl font-bold" /> <span className="text-base">Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/board"
                aria-label="Ir al Board"
                className={`flex items-center p-2 rounded ${location.pathname === '/board' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <FaTh className="mr-3 text-xl font-bold" /> <span className="text-base">Board</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cronograma"
                aria-label="Ir al Cronograma"
                className={`flex items-center p-2 rounded ${location.pathname === '/cronograma' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <FaCalendar className="mr-3 text-xl font-bold" /> <span className="text-base">Cronograma</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="text-center text-sm mt-auto">
        <p>Todos los derechos reservados</p>
        <p>MrSoft © 2024</p>
      </div>
    </div>
  );
};

export default Sidebar;