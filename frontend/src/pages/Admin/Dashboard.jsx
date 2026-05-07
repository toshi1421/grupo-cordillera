import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Aquí se pueden agregar estadísticas e información del admin
  return (
    <div className="dashboard">
      <h1>Dashboard Administrativo</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Productos</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Ventas</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Ingresos</h3>
          <p className="stat-number">$0</p>
        </div>
      </div>

      <div className="content">
        <p>Bienvenido al panel de administración</p>
      </div>
    </div>
  );
};

export default Dashboard;
