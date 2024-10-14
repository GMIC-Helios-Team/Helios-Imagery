import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import styles from './NavBar.module.css'; // or import './NavBar.module.css' if using module CSS

const NavBar: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isWarping, setIsWarping] = useState(false);
  const [imageSrc, setImageSrc] = useState(isDarkTheme ? '/images/DEPLogo.png' : '/images/HeliosLogo.png');

  useEffect(() => {
    setImageSrc(isDarkTheme ? '/images/DEPLogo.png' : '/images/HeliosLogo.png');
  }, [isDarkTheme]);

  const handleRadioChange = (value: string) => {
    if ((value === 'dark' && !isDarkTheme) || (value === 'light' && isDarkTheme)) {
      toggleTheme();
    }
  };

  const handleThemeToggle = () => {
    setIsWarping(true);
    setImageSrc(isDarkTheme ? '/images/HeliosLogo.png' : '/images/DEPLogo.png'); // Update image source immediately
    setTimeout(() => {
      toggleTheme();
      setIsWarping(false);
    }, 600); // Duration of the warp animation
  };

  const radios = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  return (
    <Navbar expand="lg" className={isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} style={{ height: '80px' }}>
      <div className="container-fluid">
        <Link href="/" legacyBehavior>
          <a className={`navbar-brand ${styles.navbarBrand}`}>Helios</a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/profile" legacyBehavior>
              <a className={`nav-link ${styles.navLink}`}>Profile</a>
            </Link>
            <Link href="/ai-gen" legacyBehavior>
              <a className={`nav-link ${styles.navLink}`}>AI-Gen</a>
            </Link>
          </Nav>
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
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;