// components/NavBar.tsx
import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  isDarkTheme: boolean;  
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isDarkTheme, toggleTheme }) => {
  return (
    <nav className={`navbar navbar-expand-lg ${isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">Helios</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className="nav-link">Dashboard</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" legacyBehavior>
                <a className="nav-link">Profile</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ai-gen" legacyBehavior>
                <a className="nav-link">AI-Gen</a>
              </Link>
            </li>
          </ul>          
          <button onClick={toggleTheme} className="btn btn-outline-secondary">
            Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;