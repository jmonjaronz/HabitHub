import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, Suspense } from 'react';

//Layout
import MainLayout from './layout/MainLayout'; 
import AuthLayout from './layout/AuthLayout'; 

//Lazy Load Pages
const Login= React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Board = React.lazy(() => import('./pages/Board'));
const Tasks = React.lazy(() => import('./pages/TaskManager'));
const Cronograma = React.lazy(() => import('./pages/Cronograma'));

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (user: string) => {
    setUsername(user);
  };

  return (
    <Router>
      <Suspense>
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
      </Suspense>
    </Router>
  );
};

export default App;