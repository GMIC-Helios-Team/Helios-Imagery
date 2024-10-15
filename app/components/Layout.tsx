import React, { ReactNode } from 'react';
import { ThemeProvider, useTheme } from '../contexts/theme-context';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <NavBar />
        {children}
        <Footer />
      </ThemeWrapper>
    </ThemeProvider>
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
