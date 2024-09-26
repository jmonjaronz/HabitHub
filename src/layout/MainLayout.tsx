import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 

const MainLayout: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="flex h-screen"> {/* Cambia a h-screen para ocupar toda la altura */}
      <Sidebar />
      <div className="flex-1 flex flex-col"> {/* Asegúrate de que flex-1 esté presente */}
        <Header username={username} />
        <div className="flex-1 p-6 overflow-auto"> {/* Flex-1 para ocupar el resto del espacio */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;