// components/NavBar.tsx
import React from 'react';
import Link from 'next/link';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface NavBarProps {
  isDarkTheme: boolean;  
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isDarkTheme, toggleTheme }) => {
  const radios = [
    { name: 'Helios', value: 'light' },
    { name: 'DEP', value: 'dark' },
  ];

  const handleRadioChange = (value: string) => {
    if ((value === 'dark' && !isDarkTheme) || (value === 'light' && isDarkTheme)) {
      toggleTheme();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">{isDarkTheme ? 'DEP' : 'Helios'}</a>
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
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant='outline-secondary'
                name="radio"
                value={radio.value}
                checked={isDarkTheme ? radio.value === 'dark' : radio.value === 'light'}
                onChange={(e) => handleRadioChange(e.currentTarget.value)}
                style={{
        backgroundColor: radio.value === 'dark' ? (isDarkTheme ? '#2d345b' : 'white') : (isDarkTheme ? 'white' : '#e1a629'),
        color: radio.value === 'dark' ? (isDarkTheme ? 'white' : '#2d345b') : (isDarkTheme ? '#e1a629' : 'white'),
        borderColor:radio.value === 'dark' ? '#2d345b': '#e1a629'
      }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
       </div>
      </div>
    </nav>
  );
};

export default NavBar;