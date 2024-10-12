import {Analytics} from '@vercel/analytics/next';
import GifPreviewProvider from 'components/contexts/gifPreview';
import LanguageProvider from 'components/contexts/language';
import WindowWidthProvider from 'components/contexts/screenWidth';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import 'styles/globals.css';

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name='description' content='Portfolio and resume information of Guido Glielmi' />
        <meta
          name='google-site-verification'
          content='zAv2vKo_dWakUrSKhNCCzwKqJu5J4ZPIvMIfIIk_z2A'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='favicon.svg' type='image/svg+xml' />
      </Head>
      <LanguageProvider>
        <GifPreviewProvider>
          <WindowWidthProvider>
            <Component {...pageProps} key={router.asPath} />
            <Analytics />
          </WindowWidthProvider>
        </GifPreviewProvider>
      </LanguageProvider>
    </>
  );
}
