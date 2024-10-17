import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;