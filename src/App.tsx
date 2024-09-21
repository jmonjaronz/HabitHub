import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board'; 
import Tasks from './pages/TaskManager'; 
import Cronograma from './pages/Cronograma';
import Login from './pages/Login';

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (user: string) => {
    setUsername(user);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {username && <Sidebar />} {/* Sidebar solo si hay un usuario */}
        <div className="flex flex-col flex-grow">
          {username && <Header username={username} />}
          <main className="p-6 bg-gray-100 flex-grow">
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<Board />} />
              <Route path="/tasksmanager" element={<Tasks />} /> 
              <Route path="/cronograma" element={<Cronograma />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;