// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add custom meta tags, links, scripts, etc. */}
        </Head>
        <body className="addSomeStylingHere" >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;