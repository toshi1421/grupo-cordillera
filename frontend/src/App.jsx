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

const Layout = ({ children, toggleSidebar, sidebarOpen }) => (
  <div className="app">
    <Navbar toggleSidebar={toggleSidebar} />
    <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} />
      <main className="main-content">
        {children}
      </main>
    </div>
  </div>
);

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
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventario"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Inventario />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;