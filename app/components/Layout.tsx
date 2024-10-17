import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;