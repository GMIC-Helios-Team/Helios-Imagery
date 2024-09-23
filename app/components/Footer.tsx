// components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(250, 250, 253, 253)' }}>
        <span>© 2023 Copyright:&nbsp;</span>
        <a className="text-dark" href="https://futurama-helios.com/">futurama-helios.com</a>
      </div>
    </footer>
  );
};

export default Footer;