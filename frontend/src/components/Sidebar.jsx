import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  // Solo mostrar Sidebar si es admin
  if (!user || user.rol !== 'admin') {
    return null;
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/inventario">Gestionar Inventario</Link>
          </li>
          <li>
            <Link to="/admin/ventas">Ver Ventas</Link>
          </li>
          <li>
            <Link to="/admin/usuarios">Gestionar Usuarios</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
