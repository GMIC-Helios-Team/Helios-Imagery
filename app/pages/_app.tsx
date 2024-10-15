// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  );
}

export default HeliosFuturamaApp;