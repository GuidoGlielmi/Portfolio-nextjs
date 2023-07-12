import type {AppProps} from 'next/app';
import {AnimatePresence} from 'framer-motion';
import 'styles/globals.css';
import {useRouter} from 'next/router';
import LanguageProvider from 'components/contexts/language';
import GifPreviewProvider from 'components/contexts/gifPreview';

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode='wait' initial={false}>
      <LanguageProvider>
        <GifPreviewProvider>
          <Component {...pageProps} key={router.asPath} />
        </GifPreviewProvider>
      </LanguageProvider>
    </AnimatePresence>
  );
}
