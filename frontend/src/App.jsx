import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Dashboard from './pages/Admin/Dashboard';
import Inventario from './pages/Admin/Inventario';

import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="app-container">
            <Sidebar sidebarOpen={sidebarOpen} />
            <main className="main-content">
              <Routes>
                {}
                <Route path="/login" element={<Login />} />

                {}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                {}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/inventario"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Inventario />
                    </ProtectedRoute>
                  }
                />

                {}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
