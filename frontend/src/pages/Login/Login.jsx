import React, { useState } from 'react';
import api from '../../api/api'; 
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !clave.trim()) {
      setError('Por favor, ingresa tus credenciales corporativas.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await api.post('/auth/login', { usuario, clave });

      if (respuesta.data && respuesta.data.token) {
        localStorage.setItem('token', respuesta.data.token);
        window.location.href = '/inventario';
      }
    } catch (err) {
      setError('Usuario o contraseña incorrectos. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2 className="titulo-corporativo">Grupo Cordillera</h2>
          <p className="subtitulo-monitoreo">Plataforma de Monitoreo</p>
        </div>

        <form className="login-form" onSubmit={manejarLogin}>
          <div className="input-group">
            <label htmlFor="usuario">Usuario Corporativo</label>
            <input
              id="usuario"
              type="text"
              placeholder="nombre.apellido"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className={error ? 'input-error' : ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              type="password"
              placeholder="••••••••"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className={error ? 'input-error' : ''}
            />
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit" className="btn-acceso" disabled={cargando}>
            {cargando ? 'Verificando...' : 'Acceder al Sistema'}
          </button>
        </form>

        <footer className="login-footer">
          <p>¿No tienes acceso? <span className="link">Solicitar Registro</span></p>
        </footer> 
      </div>
    </div>
  );
};

export default Login;