
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import UserDashboard from './pages/User/UserDashboard';
import Profile from './pages/Common/Profile';
import Support from './pages/Common/Support';
import Dashboard from './pages/Admin/Dashboard';
import Inventario from './pages/Admin/Inventario';
import UsersManagement from './pages/Admin/UsersManagement';
import SystemLogs from './pages/Admin/SystemLogs';

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

const RoleHomeRedirect = () => {
  const { user } = useAuth();
  const role = (user?.rol || '').toUpperCase();

  return <Navigate to={role === 'ADMIN' ? '/dashboard' : '/usuario'} replace />;
};

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
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoleHomeRedirect />
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuario"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <UserDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <UsersManagement />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/logs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <SystemLogs />
                </Layout>
              </ProtectedRoute>
            }
          />

         <Route path="/inventario" element={
            <ProtectedRoute> 
              <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
            <Inventario />
          </Layout>
        </ProtectedRoute>
        } />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/soporte"
            element={
              <ProtectedRoute>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Support />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Layout toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
                  <Home />
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