import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = (): JSX.Element => {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="nav-brand-icon">📋</span>
          <span className="nav-brand-text">TaskManager</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
