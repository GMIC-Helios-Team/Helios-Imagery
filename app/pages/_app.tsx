import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/theme-context';
import Layout from '../components/Layout';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default HeliosFuturamaApp;