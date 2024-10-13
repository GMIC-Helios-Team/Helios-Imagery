// components/Footer.tsx
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="bottom" >
      <div className="p-3">
        <span>© 2024 Copyright:&nbsp;</span>
        <a className="text-dark" href="https://helios.gallery/">futurama-helios.com</a>
      </div>
    </Navbar>
  );
};

export default Footer;