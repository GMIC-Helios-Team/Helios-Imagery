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
    <Navbar expand="lg" className={`${styles.navbar} ${isDarkTheme ? `navbar-dark bg-dark` : `navbar-light LightThemeBG`}`} >   
          <Navbar.Brand className={`${styles.navbarBrand}`} href="/">
          {isDarkTheme ? 'DEP' : 'Helios'}
        </Navbar.Brand>
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
        <Navbar.Toggle className={`${styles.navToggle}`} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={isDarkTheme ? styles.navbarCollapseDark : styles.navbarCollapseLight}>
          <Nav className="ml-auto">   
            <hr />        
            <Nav.Link as={Link} href="/gallery" className={`nav-link ${styles.navLink} ${isDarkTheme ? styles.navLinkDark : styles.navLinkLight}`}>
            Gallery
          </Nav.Link>
          <Nav.Link as={Link} href="/profile" className={`nav-link ${styles.navLink} ${isDarkTheme ? styles.navLinkDark : styles.navLinkLight}`}>
            Profile
          </Nav.Link>
          <Nav.Link as={Link} href="/ai-gen" className={`nav-link ${styles.navLink} ${isDarkTheme ? styles.navLinkDark : styles.navLinkLight}`}>
            Creative Canvas
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;