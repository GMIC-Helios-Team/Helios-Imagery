import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;