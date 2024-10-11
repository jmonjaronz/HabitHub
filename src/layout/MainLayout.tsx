import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import { TooltipProvider } from '@radix-ui/react-tooltip'; 

const MainLayout: React.FC<{ username: string }> = ({ username }) => {
  return (
    <TooltipProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col"> 
          <Header username={username} />
          <div className="flex-1 p-6 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
