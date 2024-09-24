/* eslint-disable @next/next/no-sync-scripts */
// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css'; // Import the global CSS file

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Helios Futurama</title>
        <script src="/js/bootstrap.bundle.min.js"></script>
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