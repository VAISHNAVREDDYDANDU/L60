import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid credentials. Please use Lakshmi/Lakshmi.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container fade-in">
      <div className="login-content">
        <div className="login-header">
          <div className="logo">
            <h1>L60 - Generative AI</h1>
          </div>
          <p className="tagline">Exploring the future of artificial intelligence</p>
        </div>
        
        <div className="card login-card">
          <div className="card-header">
            <h2 className="card-title">Sign In</h2>
            <p className="card-subtitle">Access your Generative AI analytics dashboard</p>
          </div>
          
          <div className="card-content">
            <form onSubmit={handleSubmit} className="login-form" aria-label="Login form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    aria-required="true"
                    aria-describedby={error ? "error-message" : undefined}
                  />
                </div>
                {!username && error && (
                  <div className="error-message">Username is required</div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper password-input">
                  <input
                    type={hidePassword ? 'password' : 'text'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    aria-required="true"
                    aria-describedby={error ? "error-message" : undefined}
                  />
                  <span className="icon-lock">🔒</span>
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setHidePassword(!hidePassword)}
                    aria-label="Toggle password visibility"
                  >
                    <span className="icon">{hidePassword ? '👁️‍🗨️' : '👁️'}</span>
                  </button>
                </div>
                {!password && error && (
                  <div className="error-message">Password is required</div>
                )}
              </div>
              
              {error && (
                <div className="error-message api-error" role="alert" aria-live="polite" id="error-message">
                  {error}
                </div>
              )}
              
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={!username || !password || loading}
                  className="btn btn-primary login-button"
                  aria-busy={loading}
                >
                  <span className="icon" style={{ display: loading ? 'none' : 'inline' }}>➡️</span>
                  <span className="icon loading" style={{ display: loading ? 'inline' : 'none' }}>⏳</span>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card-footer login-footer">
            <p>Demo credentials: username: <strong>Lakshmi</strong>, password: <strong>Lakshmi</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
