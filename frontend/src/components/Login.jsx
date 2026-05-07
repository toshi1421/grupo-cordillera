import React, { useState } from 'react';
import { loginUser } from '../services/api';
import './Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [estaCargando, setEstaCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (!correo.trim() || !clave.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setEstaCargando(true);

    try {
      const data = await loginUser(correo, clave);
      
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <div className="login-contenedor">
      <div className="login-tarjeta">
        <div className="login-encabezado">
          <h2 className="login-titulo">Grupo Cordillera</h2>
          <p className="login-subtitulo">Gestión de Stickers e Ilustraciones</p>
        </div>

        <form className="login-formulario" onSubmit={manejarEnvio}>
          <div className="grupo-entrada">
            <label>Correo Electrónico</label>
            <input
              type="email"
              className="campo-entrada"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="grupo-entrada">
            <label>Contraseña</label>
            <input
              type="password"
              className="campo-entrada"
              placeholder="********"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button 
            type="submit" 
            className="boton-login" 
            disabled={estaCargando}
          >
            {estaCargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="login-pie">
          ¿No tienes una cuenta? <span className="enlace-registro">Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default Login;