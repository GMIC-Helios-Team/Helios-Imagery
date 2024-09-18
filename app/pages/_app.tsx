// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import '../styles/global.css'; // Import the global CSS file

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // Dynamically import the Bootstrap JavaScript file
    import("bootstrap/dist/js/bootstrap.bundle.js")
      .then(() => {
        console.log('Bootstrap JS loaded successfully');
      })
      .catch((err) => {
        console.error('Error loading Bootstrap JS:', err);
      });

  }, []);


  return (
    <>
      <Head>
        <title>Helios Futurama</title>
      </Head>
      <NavBar />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default HeliosFuturamaApp;