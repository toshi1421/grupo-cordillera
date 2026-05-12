
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import allowedDomains from '../../config/allowedDomains';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth(); 

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    const lowerEmail = email.toLowerCase();
    const esDominioValido = allowedDomains.some((dominio) => lowerEmail.endsWith(dominio));
    
    if (!esDominioValido) {
      setError(`Dominio no autorizado. Use: ${allowedDomains.join(', ')}`);
      return;
    }

    setCargando(true);

    try {
      const data = await login(email, password);
      const rol = (data?.usuario?.rol || data?.user?.rol || user?.rol || 'USER').toUpperCase();
      const destino = rol === 'ADMIN' ? '/dashboard' : '/usuario';

      navigate(destino, { replace: true });

    } catch (err) {
      console.error("Error capturado en login:", err);
      if (err.response && err.response.status === 401) {
        setError('Credenciales incorrectas. Revisa tu correo o contraseña.');
      } else if (err.code === 'ECONNABORTED') {
        setError('El servidor tardó demasiado en responder. Verifica que los servicios estén activos.');
      } else if (!err.response) {
        setError('No se pudo conectar con el servidor. Revisa que API Gateway esté iniciado en puerto 8080.');
      } else {
        setError('Error al conectar con el servidor. Intenta más tarde.');
      }
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
              placeholder="usuario@cordillera.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={cargando}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-field">
              <input
                id="password"
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={cargando}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit" className="btn-acceso" disabled={cargando}>
            {cargando ? 'Iniciando sesión...' : 'Acceder al Sistema'}
          </button>
        </form>

        <footer className="login-footer">
          <p>¿Necesitas una cuenta? <span className="link" onClick={() => navigate('/register')}>Registrarse</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Login;