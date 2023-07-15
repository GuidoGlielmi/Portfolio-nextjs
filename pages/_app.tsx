import type {AppProps} from 'next/app';
import 'styles/globals.css';
import {useRouter} from 'next/router';
import LanguageProvider from 'components/contexts/language';
import GifPreviewProvider from 'components/contexts/gifPreview';
import Head from 'next/head';

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='favicon.svg' type='image/svg+xml' />
      </Head>
      <LanguageProvider>
        <GifPreviewProvider>
          <Component {...pageProps} key={router.asPath} />
        </GifPreviewProvider>
      </LanguageProvider>
    </>
  );
}
