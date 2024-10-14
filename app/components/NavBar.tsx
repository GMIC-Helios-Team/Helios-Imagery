import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const NavBar: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isWarping, setIsWarping] = useState(false);
  const [imageSrc, setImageSrc] = useState(isDarkTheme ? '/images/DEPLogo.png' : '/images/HeliosLogo.png');
  const radios = [
    { name: 'Helios', value: 'light' },
    { name: 'DEP', value: 'dark' },
  ];

  const handleRadioChange = (value: string) => {
    if ((value === 'dark' && !isDarkTheme) || (value === 'light' && isDarkTheme)) {
      toggleTheme();
    }
  };
  useEffect(() => {
    setImageSrc(isDarkTheme ? '/images/DEPLogo.png' : '/images/HeliosLogo.png');
  }, [isDarkTheme]);

  const handleThemeToggle = () => {
    toggleTheme();
    setIsWarping(true);
    setImageSrc(isDarkTheme ? '/images/HeliosLogo.png' : '/images/DEPLogo.png'); // Update image source immediately
    setTimeout(() => {
      setIsWarping(false);
    }, 600); // Duration of the warp animation
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} style={{ height: '80px' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center position-relative">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">Helios</a>
        </Link>
        <ul className="navbar-nav me-auto">
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
        <div className="position-absolute start-50 translate-middle-x">
          <button onClick={handleThemeToggle} className="btn btn-link" style={{ marginBottom: '0' }}>
            <img
              src={imageSrc}
              alt={isDarkTheme ? 'Light Mode' : 'Dark Mode'}
              style={{ width: '350px', height: '80px' }}
              className={isWarping ? 'warp-animation' : ''}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;