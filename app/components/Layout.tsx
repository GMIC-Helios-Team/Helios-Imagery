import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useTheme } from '@/contexts/theme-context';

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

const ThemeWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDarkTheme } = useTheme();

  React.useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return <>{children}</>;
};

export default Layout;
