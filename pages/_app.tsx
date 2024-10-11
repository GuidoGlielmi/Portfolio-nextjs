import {Analytics} from '@vercel/analytics/next';
import GifPreviewProvider from 'components/contexts/gifPreview';
import LanguageProvider from 'components/contexts/language';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import 'styles/globals.css';

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
          <Analytics />
        </GifPreviewProvider>
      </LanguageProvider>
    </>
  );
}
