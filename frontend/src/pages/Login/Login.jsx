import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allowedDomains from '../../config/allowedDomains';
import api from '../../services/api';
import authService from '../../services/authService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Por favor, ingresa tu Gmail y contraseña.');
      return;
    }

    const lower = email.toLowerCase();
    const valid = allowedDomains.some((d) => lower.endsWith(d));
    if (!valid) {
      setError(`Por favor ingresa un correo con uno de los dominios permitidos: ${allowedDomains.join(', ')}`);
      return;
    }

    setCargando(true);

    try {
      await authService.login(email, password);
      if (authService.isAuthenticated()) {
        navigate('/inventario');
      } else {
        setError('Usuario o contraseña incorrectos. Intenta nuevamente.');
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
            <label htmlFor="email">Correo corporativo</label>
            <input
              id="email"
              type="email"
              placeholder="nombre@cordillera.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? 'input-error' : ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? 'input-error' : ''}
            />
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit" className="btn-acceso" disabled={cargando}>
            {cargando ? 'Verificando...' : 'Acceder al Sistema'}
          </button>
        </form>

        
        <footer className="login-footer">
          <p>¿No tienes acceso? <span className="link" onClick={() => navigate('/register')}>Solicitar Registro</span></p>
        </footer> 
      </div>
    </div>
  );
};

export default Login;