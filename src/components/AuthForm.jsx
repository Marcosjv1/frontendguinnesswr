import { useState } from 'react';
import { login, register } from '../services/api';

export default function AuthForm() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('username');
    return token && savedUser ? { token, username: savedUser } : null;
  });

  const resetFeedback = () => {
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    try {
      const payload = { username, password };
      const data = mode === 'login' ? await login(payload) : await register(payload);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setSession({ token: data.token, username: data.username });
      setMessage(mode === 'login' ? 'Sesión iniciada correctamente.' : 'Cuenta creada correctamente.');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Ocurrió un error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setSession(null);
    setMessage('Sesión cerrada.');
    setError('');
  };

  return (
    <section id="auth" className="card shadow-sm mt-5">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Acceso de Usuario</h2>

        <div className="btn-group mb-3" role="group" aria-label="Cambiar modo autenticación">
          <button
            type="button"
            className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              setMode('login');
              resetFeedback();
            }}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              setMode('register');
              resetFeedback();
            }}
          >
            Crear cuenta
          </button>
        </div>

        {session ? (
          <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
            <span>Conectado como: <strong>{session.username}</strong></span>
            <button type="button" className="btn btn-sm btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? 'Procesando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>
        )}

        {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
        {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
      </div>
    </section>
  );
}
