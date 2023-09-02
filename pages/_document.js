import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="rtl">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/logo/icon-192*192.png" />
        <meta name="theme-color" content="#284B63" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
