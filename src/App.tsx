import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, Suspense } from 'react';

//Layout
import MainLayout from './layout/MainLayout'; 
import AuthLayout from './layout/AuthLayout'; 

//Spinner
import Spinner from './components/Spinner';
//Lazy Load Pages
const Login = React.lazy(() => import('./pages/Login'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Board = React.lazy(() => import('./pages/Board'));
const Tasks = React.lazy(() => import('./pages/TaskManager'));
const Cronograma = React.lazy(() => import('./pages/Cronograma'));
const Issues = React.lazy(() => import('./pages/Issues'));

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (user: string) => {
    setUsername(user);
  };

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Rutas no autenticadas */}
          <Route path="/" element={
            <AuthLayout>
              <Login onLogin={handleLogin} />
            </AuthLayout>
          } />
          <Route path="/forgot_password" element={<AuthLayout><ForgotPassword/></AuthLayout>} />

          {/* Rutas autenticadas */}
          <Route element={username ? <MainLayout username={username} /> : <Navigate to="/" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board" element={<Board />} />
            <Route path="/tasksmanager" element={<Tasks />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="/issues" element={<Issues/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;