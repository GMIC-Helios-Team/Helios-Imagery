import Navbar from './NavBar'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundary'
import Head from 'next/head';
import { ReactNode } from 'react';

interface LayoutProps {
  readonly children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Helios Futurama</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Navbar />
      <ErrorBoundary>
        <main>{children}</main>
      </ErrorBoundary>
      <Footer />
    </>
  )
}