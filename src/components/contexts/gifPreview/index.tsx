import {BACKGROUND_ID} from '@constants';
import {AnimatePresence, motion} from 'framer-motion';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

export interface GifPreviewProps {
  setSrc: Dispatch<SetStateAction<string>>;
  src: string;
}
type GifPreviewProviderProps = {children: React.ReactNode};

export const GifPreviewContext = createContext<GifPreviewProps | null>(null);

const GifPreviewProvider: FC<PropsWithChildren<GifPreviewProviderProps>> = ({children}) => {
  const [src, setSrc] = useState('');
  const contextValue = useMemo(() => ({setSrc, src}), [src]);
  return (
    <GifPreviewContext.Provider value={contextValue}>
      <Background onClose={() => setSrc('')} open={!!src}>
        <img
          src={`gifs/${src}`}
          alt='Gif preview'
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: 5,
            boxShadow: '#0000005c 0px 0px 40px',
            cursor: 'default',
            position: 'relative',
            zIndex: 5001,
          }}
        />
      </Background>
      {children}
    </GifPreviewContext.Provider>
  );
};

export interface BackgroundProps {
  onClose: () => void | undefined;
  open: boolean;
}

const Background: FC<PropsWithChildren<BackgroundProps>> = ({children, onClose, open}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.button
          transition={{duration: 0.1, ease: 'easeOut'}}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          key={BACKGROUND_ID}
          id={BACKGROUND_ID}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            width: '100vw',
            height: '100vh',
            background: '#00000022',
            zIndex: 5000,
            backdropFilter: 'blur(2px)',
            cursor: 'pointer',
          }}
          onClick={e => {
            if ((e.target as any).id === BACKGROUND_ID) onClose();
          }}
        >
          <AnimatePresence>
            <motion.div
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
              }}
              transition={{duration: 0.2, ease: 'easeOut'}}
              initial={{transform: 'scale(0.8)'}}
              animate={{transform: 'scale(1)'}}
              exit={{transform: 'scale(0.8)'}}
              key='content'
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GifPreviewProvider;
