import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ThemeProvider, useTheme } from '@/contexts/theme-context';
import React from 'react';
import { CSPostHogProvider } from '@/providers'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <CSPostHogProvider>
        <body>
          <ThemeProvider>
            <ThemeWrapper>
              <Main />
              <NextScript />
            </ThemeWrapper>
          </ThemeProvider>
        </body>
        </CSPostHogProvider>
      </Html>
    );
  }
}

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkTheme } = useTheme();

  React.useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return <>{children}</>;
};

export default MyDocument;