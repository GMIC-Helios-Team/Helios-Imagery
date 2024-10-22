import Link from 'next/link';
import { useTheme } from '@/contexts/theme-context';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HeliosRobotIcon from '@/public/Helios-Robot-Icon.svg';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [hasFormData, setHasFormData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const formData = Cookies.get('ai-gen-name');
    setHasFormData(!!formData);
  }, [router.asPath]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setExpanded(!expanded);

  const handleRadioChange = (value: string) => {
    if ((value === 'dark' && !isDarkTheme) || (value === 'light' && isDarkTheme)) {
      toggleTheme();
    }
  };

  const radios = [
    { name: 'Helios', value: 'light' },
    { name: 'DEP', value: 'dark' },
  ];

  const toggleColor = isDarkTheme ? '#e1a629' : '#2d345b';

  const pageNames: { [key: string]: string } = {
    '/gallery': 'Gallery',
    '/profile': 'Profile',
    '/ai-gen': 'Creative Canvas',
    '/RockPaperScissors': 'AI Game',
  };

  return (
    <div
      className={`w-full sticky top-0 z-50 transition-colors duration-300 ${
        isDarkTheme ? 'bg-dark-theme-bg text-white' : 'bg-light-gray text-black'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={handleToggle}
          ref={navbarRef}
          className="flex justify-between items-center py-2 w-full"
        >
          {/* Logo and Theme Toggle */}
          <div className="flex items-center space-x-3">
            <Navbar.Brand href="/" className="flex items-center space-x-2">
              <Image
                src={HeliosRobotIcon}
                alt="Helios Robot Icon"
                width={40}
                height={40}
                className={`transition-all duration-300 ${
                  isDarkTheme ? 'svg-white' : 'svg-black'
                }`}
              />
              <ButtonGroup className="flex space-x-2">
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={
                      isDarkTheme ? radio.value === 'dark' : radio.value === 'light'
                    }
                    onChange={() => handleRadioChange(radio.value)}
                    className="border-2 focus:outline-none transition-all duration-300"
                    style={{
                      backgroundColor:
                        radio.value === 'dark'
                          ? isDarkTheme
                            ? '#2d345b'
                            : 'white'
                          : isDarkTheme
                          ? 'white'
                          : '#e1a629',
                      color:
                        radio.value === 'dark'
                          ? isDarkTheme
                            ? 'white'
                            : '#2d345b'
                          : isDarkTheme
                          ? '#e1a629'
                          : 'white',
                      borderColor: radio.value === 'dark' ? '#2d345b' : '#e1a629',
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Navbar.Brand>
          </div>

          {/* Toggle Button */}
          <Navbar.Toggle
            className={`border-2 rounded focus:outline-none transition-all duration-300`}
            aria-controls="basic-navbar-nav"
            style={{ borderColor: toggleColor }}
          >
            <div className="flex flex-col space-y-1">
              <span
                className="block h-0.5 w-6 rounded-sm"
                style={{ backgroundColor: toggleColor }}
              />
              <span
                className="block h-0.5 w-6 rounded-sm"
                style={{ backgroundColor: toggleColor }}
              />
              <span
                className="block h-0.5 w-6 rounded-sm"
                style={{ backgroundColor: toggleColor }}
              />
            </div>
          </Navbar.Toggle>

          {/* Navbar Links */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-center items-center text-center mt-4 lg:mt-0 lg:justify-end w-full"
          >
            <Nav className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0 w-full lg:w-auto">
              {Object.keys(pageNames).map((path) => {
                // Conditionally render AI Game link
                if (path === '/RockPaperScissors' && !hasFormData) return null;

                return (
                  <Nav.Link
                    as={Link}
                    href={path}
                    key={path}
                    className={`text-lg transition-all duration-300 ${
                      router.pathname === path ? 'font-bold' : ''
                    } ${isDarkTheme ? 'text-light' : 'text-dark'}`}
                    style={{
                      borderBottom:
                        router.pathname === path ? `2px solid ${toggleColor}` : 'none',
                      color: router.pathname === path ? toggleColor : 'inherit',
                    }}
                    onClick={() => setExpanded(false)}
                  >
                    {pageNames[path]}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
