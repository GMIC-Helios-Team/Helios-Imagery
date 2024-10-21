import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HeliosRobotIcon from '@/public/Helios-Robot-Icon.svg';import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [hasFormData, setHasFormData] = useState(false);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
  };
  
  useEffect(() => {
    const formData = Cookies.get('ai-gen-name');
    setHasFormData(!!formData);
  }, [router.asPath]);

  const handleNavLinkClick = () => {
    setExpanded(false);
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

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
    <div className={`w-full ${isDarkTheme ? 'bg-dark-theme-bg' : 'bg-light-gray'}`}>
      {/* Full-width background */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Max-width container */}
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={handleToggle}
          ref={navbarRef}
          className="flex items-center"
        >
          <Navbar.Brand href="/" className="flex items-center">
            <Image
              src={HeliosRobotIcon}
              alt="Helios Robot Icon"
              width={40}
              height={40}
              className={`mr-5 ${isDarkTheme ? 'svg-white' : 'svg-black'}`}
            />
            <ButtonGroup className="ml-auto flex">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-secondary"
                  name="radio"
                  value={radio.value}
                  checked={isDarkTheme ? radio.value === 'dark' : radio.value === 'light'}
                  onChange={() => handleRadioChange(radio.value)}                 
                  style={{
                    backgroundColor: radio.value === 'dark'
                      ? isDarkTheme
                        ? '#2d345b'
                        : 'white'
                      : isDarkTheme
                        ? 'white'
                        : '#e1a629',
                    color: radio.value === 'dark'
                      ? isDarkTheme
                        ? 'white'
                        : '#2d345b'
                      : isDarkTheme
                        ? '#e1a629'
                        : 'white',
                    borderColor: radio.value === 'dark'
                      ? '#2d345b'
                      : '#e1a629'
                  }}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Navbar.Brand>
          <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto flex">
              <Nav.Link as={Link} href="/gallery" className="mx-2">
                Gallery
              </Nav.Link>
              <Nav.Link as={Link} href="/profile" className="mx-2">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} href="/ai-gen" className="mx-2">
                Creative Canvas
              </Nav.Link>
            {hasFormData && (
            <Nav.Link as={Link} href="/RockPaperScissors" className="mx-2" onClick={handleNavLinkClick}>
              AI Game
            </Nav.Link>
          )}
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
