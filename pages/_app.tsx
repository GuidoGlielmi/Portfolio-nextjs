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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Guido Glielmi portfolio',
    url: 'https://www.guidoglielmi.com.ar',
    description: 'Showcase of portfolio and resume information of Guido Glielmi',
    logo: './assets/img/profile-img2.jpg',
  };

  return (
    <>
      <Head>
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Guido Glielmi portfolio' />
        <meta
          property='og:description'
          content='Showcase of portfolio and resume information of Guido Glielmi'
        />
        <meta property='og:image' content='./assets/img/profile-img2.jpg' />
        <meta property='og:url' content='https://guidoglielmi.com.ar' />

        <meta name='description' content='Portfolio and resume information of Guido Glielmi' />
        <meta
          name='google-site-verification'
          content='zAv2vKo_dWakUrSKhNCCzwKqJu5J4ZPIvMIfIIk_z2A'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='thumbnail' content='./favicon.svg' />

        <link rel='icon' href='./favicon.svg' type='image/svg+xml' />
        <link rel='shortcut icon' href='./assets/img/profile-img2.jpg' />

        <link rel='alternate' href='https://guidoglielmi.com.ar?lang=en' hrefLang='en' />
        <link rel='alternate' href='https://guidoglielmi.com.ar?lang=es' hrefLang='es' />

        <script
          key='website-jsonld'
          type='application/ld+json'
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
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
