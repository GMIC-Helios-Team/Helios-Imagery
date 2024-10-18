import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';

import { useEffect } from 'react';
import { matchRoutes } from 'react-router-dom';
import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { ThemeProvider } from '@/contexts/theme-context';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeFaro({
      url: 'https://faro-collector-prod-us-east-0.grafana.net/collect/4ece3a6d95059fb3d96119669a92546b',
      app: {
        name: 'Helios.Gallery',
        version: '1.0.0',
        environment: 'production'
      },
      // fetchOptions: {
      //   mode: 'no-cors',
      // },
      instrumentations: [
        // Mandatory, omits default instrumentations otherwise.
        ...getWebInstrumentations(),
        // Tracing package to get end-to-end visibility for HTTP requests.
        new TracingInstrumentation(),
        // React integration for React applications.
        new ReactIntegration({
          router: createReactRouterV6DataOptions({
            matchRoutes,
          }),
        }),
      ],
    });
  }, []);
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default HeliosFuturamaApp;