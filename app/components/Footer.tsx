import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useTheme } from '@/contexts/theme-context';

const Footer: React.FC = () => {
  
  const { isDarkTheme } = useTheme();

  return (
    <Navbar expand="lg" className={`${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`} fixed="bottom">
      <div className="p-3">
        <span>© 2024 Copyright:&nbsp;</span>
        <a className={isDarkTheme ? 'text-light' : 'text-dark'} href={process.env.NEXT_FUTURAMA_URL}>futurama-helios.com</a>
      </div>
    </Navbar>
  );
};

export default Footer;