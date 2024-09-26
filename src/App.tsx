import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './layout/MainLayout'; // Nuevo layout para rutas autenticadas
import AuthLayout from './layout/AuthLayout'; // Layout existente para autenticación
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
      <Routes>
        {/* Rutas no autenticadas */}
        <Route path="/" element={
          <AuthLayout>
            <Login onLogin={handleLogin} />
          </AuthLayout>
        } />

        {/* Rutas autenticadas */}
        <Route element={username ? <MainLayout username={username} /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          <Route path="/tasksmanager" element={<Tasks />} />
          <Route path="/cronograma" element={<Cronograma />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;