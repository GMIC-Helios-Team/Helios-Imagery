// components/Footer.tsx
import React from 'react';

interface FooterProps {
  isDarkTheme: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkTheme }) => {
  return (
    <footer className={`footer text-center text-lg-start ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div
        className="text-center p-3"
        style={{ backgroundColor: isDarkTheme ? 'rgba(52, 58, 64, 0.9)' : 'rgba(250, 250, 253, 0.9)' }}
      >
        <span>© 2023 Copyright:&nbsp;</span>
        <a className={isDarkTheme ? 'text-light' : 'text-dark'} href="https://futurama-helios.com/">
          futurama-helios.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;