import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user?.nombreUsuario || user?.nombre || 'Sin nombre'}</p>
      <p>Correo: {user?.email || 'Sin correo'}</p>
      <p>Rol: {user?.rol || 'USER'}</p>
      <p>Aqui podras editar tus datos personales y cambiar tu contrasena.</p>
    </div>
  );
};

export default Profile;