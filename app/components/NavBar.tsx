import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css'; // Import the CSS Module

const NavBar: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const handleRadioChange = (value: string) => {
    if ((value === 'dark' && !isDarkTheme) || (value === 'light' && isDarkTheme)) {
      toggleTheme();
    }
  };

  const radios = [
    { name: 'Helios', value: 'light' },
    { name: 'DEP', value: 'dark' },
  ];

  return (
    <Navbar expand="lg" className={`${styles.navbar} ${isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} style={{ height: '80px' }}>
      <div className="container-fluid">
        <Link href="/" legacyBehavior>
          <a className={`navbar-brand ${styles.navbarBrand}`}>{isDarkTheme ? 'DEP' : 'Helios'}</a>
        </Link>
          <ButtonGroup className={`${styles.navbarButton}`}>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant='outline-secondary'
                name="radio"
                value={radio.value}
                checked={isDarkTheme ? radio.value === 'dark' : radio.value === 'light'}
                onChange={() => handleRadioChange(radio.value)}
                style={{
                  backgroundColor: radio.value === 'dark' ? (isDarkTheme ? '#2d345b' : 'white') : (isDarkTheme ? 'white' : '#e1a629'),
                  color: radio.value === 'dark' ? (isDarkTheme ? 'white' : '#2d345b') : (isDarkTheme ? '#e1a629' : 'white'),
                  borderColor: radio.value === 'dark' ? '#2d345b' : '#e1a629'
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={isDarkTheme ? styles.navbarCollapseDark : styles.navbarCollapseLight}>
          <Nav className="ml-auto">
            <Link href="/gallery" legacyBehavior>
              <a className={`nav-link ${styles.navLink}`}>Gallery</a>
            </Link>
            <Link href="/profile" legacyBehavior>
              <a className={`nav-link ${styles.navLink}`}>Profile</a>
            </Link>
            <Link href="/ai-gen" legacyBehavior>
              <a className={`nav-link ${styles.navLink}`}>Creative Canvas</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;