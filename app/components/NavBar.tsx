import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HeliosRobotIcon from '@/public/Helios-Robot-Icon.svg';

const NavBar: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
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
              className={isDarkTheme ? 'svg-white' : 'svg-black'}
            />
            <span className="ml-2 font-bold text-xl">
              {isDarkTheme ? 'DEP' : 'Helios'}
            </span>
          </Navbar.Brand>
          <ButtonGroup className="ml-auto hidden sm:flex">
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
                className="mx-1"
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
