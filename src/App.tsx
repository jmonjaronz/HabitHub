import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Board from './components/Board'; 
import Tasks from './components/Tasks'; 

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="p-6 bg-gray-100 flex-grow">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<Board />} />
              <Route path="/tasks" element={<Tasks />} /> 
              {/* Agregar más rutas*/}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;