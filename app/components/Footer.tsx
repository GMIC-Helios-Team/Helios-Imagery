import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

// interface FooterProps {
//   isDarkTheme: boolean;
// }

// const Footer: React.FC<FooterProps> = ({ isDarkTheme }) => {
const Footer: React.FC = () => {
  return (
    <Navbar expand="lg" fixed="bottom">
      <div className="p-3">
        <span>© 2024 Copyright:&nbsp;</span>
        <a href="https://helios.gallery/">futurama-helios.com</a>
      </div>
    </Navbar>
  );
};

export default Footer;