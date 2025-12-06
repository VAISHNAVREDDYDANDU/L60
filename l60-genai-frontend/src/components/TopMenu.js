import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TopMenu.css';

const TopMenu = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-menu">
          <Link
            to="/dashboard"
            className={`navbar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            role="menuitem"
            aria-current={location.pathname === '/dashboard' ? 'page' : undefined}
          >
            <span className="navbar-icon">📊</span>
            <span className="navbar-text">Dashboard</span>
          </Link>
          <Link
            to="/summary"
            className={`navbar-item ${location.pathname === '/summary' ? 'active' : ''}`}
            role="menuitem"
            aria-current={location.pathname === '/summary' ? 'page' : undefined}
          >
            <span className="navbar-icon">📈</span>
            <span className="navbar-text">Summary</span>
          </Link>
          <Link
            to="/reports"
            className={`navbar-item ${location.pathname === '/reports' ? 'active' : ''}`}
            role="menuitem"
            aria-current={location.pathname === '/reports' ? 'page' : undefined}
          >
            <span className="navbar-icon">📋</span>
            <span className="navbar-text">Reports</span>
          </Link>
          <button
            className="navbar-item navbar-logout"
            onClick={handleLogout}
            role="menuitem"
            aria-label="Logout"
          >
            <span className="navbar-icon">🚪</span>
            <span className="navbar-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
