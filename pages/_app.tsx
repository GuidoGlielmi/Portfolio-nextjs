import type {AppProps} from 'next/app';
import {AnimatePresence} from 'framer-motion';
import 'styles/globals.css';
import {useRouter} from 'next/router';

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode='wait' initial>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
}
