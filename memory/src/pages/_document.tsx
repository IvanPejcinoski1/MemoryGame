import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add the viewport meta tag to prevent scaling */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className="antialiased" style={{ overflow: "hidden" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
