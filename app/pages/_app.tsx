/* eslint-disable @next/next/no-sync-scripts */
// pages/_app.tsx
import React, { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css'; // Import the global CSS file

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeProvider, useTheme } from '../contexts/theme-context';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Head>
          <title>Helios Futurama</title>
          <script src="/js/bootstrap.bundle.min.js"></script>
        </Head>
        <NavBarWithTheme />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
        <FooterWithTheme />
      </ThemeWrapper>
    </ThemeProvider>
  );
}

const ThemeWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDarkTheme } = useTheme();

  React.useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return <>{children}</>;
};

const NavBarWithTheme: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  return <NavBar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />;
};

const FooterWithTheme: React.FC = () => {
  const { isDarkTheme } = useTheme();
  return <Footer isDarkTheme={isDarkTheme} />;
};

export default HeliosFuturamaApp;