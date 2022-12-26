import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>Guido Glielmi</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='favicon.svg' type='image/svg+xml' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
