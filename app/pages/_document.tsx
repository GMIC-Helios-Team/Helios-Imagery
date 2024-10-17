import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ThemeProvider, useTheme } from '../contexts/theme-context';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ThemeProvider>
            <ThemeWrapper>
              <Main />
              <NextScript />
            </ThemeWrapper>
          </ThemeProvider>
        </body>
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