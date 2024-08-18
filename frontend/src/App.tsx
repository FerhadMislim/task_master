import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ListTasks from './pages/ListTasks';
import AddTask from './pages/AddTask';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/tasks" element={<ListTasks />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
