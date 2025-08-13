import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import Projects from './components/Dashboard/Projects';
import Tasks from './components/Dashboard/Tasks';
import ProtectedRoutes from './components/Layout/ProtectedRoute';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/projects' element={<Projects />} />
            <Route path="/projects/:projectId/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </Router >
    </>
  );
}

export default App; 