
import React from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h1>Dashboard Personal</h1>
      <div className="user-stats">
        <div className="user-stat-card">
          <h3>Mis solicitudes pendientes</h3>
          <p className="user-stat-number">0</p>
        </div>
        <div className="user-stat-card">
          <h3>Productos registrados por mi</h3>
          <p className="user-stat-number">0</p>
        </div>
        <div className="user-stat-card">
          <h3>Actividad reciente</h3>
          <p className="user-stat-number">0</p>
        </div>
      </div>
      <p className="user-dashboard-note">Este panel muestra informacion operativa personal del colaborador.</p>
    </div>
  );
};

export default UserDashboard;
