import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useTheme } from '@/contexts/theme-context';
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  
  const { isDarkTheme } = useTheme();

  return (
    <Navbar expand="lg" className={`${isDarkTheme ? 'bg-dark text-light' : 'LightThemeBG text-dark'}`}>
      <div className="p-3">
        <span>© 2024 Copyright:&nbsp;</span>
        <a className={isDarkTheme ? 'text-light' : 'text-dark'} href={process.env.NEXT_FUTURAMA_URL}>helios.gallery</a> 
        { " " }
        <a className={isDarkTheme ? 'text-light' : 'text-dark'} href="/privacy">Privacy Policy</a> 
        { " " }
        <a className={isDarkTheme ? 'text-light' : 'text-dark'} href="https://github.com/GMIC-Helios-Team/"> <FaGithub size={"30"} /></a>
      </div>
    </Navbar>
  );
};

export default Footer;