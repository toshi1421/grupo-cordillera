
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import allowedDomains from '../../config/allowedDomains';
import './Register.css';

const Register = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombreUsuario.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    const lowerEmail = email.toLowerCase();
    const esDominioValido = allowedDomains.some((dominio) => lowerEmail.endsWith(dominio));

    if (!esDominioValido) {
      setError(`Dominio no autorizado. Use: ${allowedDomains.join(', ')}`);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setCargando(true);

    try {
      await authService.register(nombreUsuario, email, password);
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      const backendError = err.response?.data?.error || err.response?.data?.mensaje || err.response?.data?.message;

      if (backendError) {
        setError(backendError);
      } else if (err.response?.status === 409) {
        setError('El usuario o email ya existe.');
      } else if (err.response?.status === 400) {
        setError('Datos inválidos o correo ya registrado.');
      } else {
        setError('No fue posible registrar la cuenta. Intenta nuevamente.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h2>Crear cuenta</h2>
          <p>Registra tu usuario para ingresar al sistema</p>
        </div>

        <form className="register-form" onSubmit={manejarRegistro}>
          <div className="input-group">
            <label htmlFor="nombreUsuario">Nombre de usuario</label>
            <input
              id="nombreUsuario"
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Ej: Juan Perez"
              disabled={cargando}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@cordillera.com"
              disabled={cargando}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              disabled={cargando}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              disabled={cargando}
            />
          </div>

          {error && <p className="mensaje-error">{error}</p>}
          {success && <p className="mensaje-success">{success}</p>}

          <button type="submit" className="btn-registro" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <footer className="register-footer">
          <p>
            ¿Ya tienes cuenta?{' '}
            <span className="link" onClick={() => navigate('/login')}>
              Inicia sesión
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
