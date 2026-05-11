import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allowedDomains from '../../config/allowedDomains';
import api from '../../services/api';
import authService from '../../services/authService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
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
            <div className="password-field">
              <input
                id="password"
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setMostrarPassword((s) => !s)}
                aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {mostrarPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-4.478 0-8.268-2.943-9.542-7a10.98 10.98 0 0 1 2.07-3.388" />
                    <path d="M1 1l22 22" />
                    <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.46 12C2.734 7.943 6.524 5 11 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S2.734 16.057 1.46 12z" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
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