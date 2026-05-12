
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ sidebarOpen = true }) => {
  const { user } = useAuth();

  const role = (user?.rol || '').toUpperCase();

  if (!user) {
    return null;
  }

  const userLinks = [
    { to: '/usuario', label: 'Inicio' },
    { to: '/inventario', label: 'Inventario' },
    { to: '/perfil', label: 'Perfil' },
    { to: '/soporte', label: 'Soporte' },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Panel de Control' },
    { to: '/inventario', label: 'Gestionar Inventario' },
    { to: '/admin/usuarios', label: 'Gestion de Usuarios' },
    { to: '/admin/logs', label: 'Logs del Sistema' },
  ];

  const links = role === 'ADMIN' ? adminLinks : userLinks;

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;