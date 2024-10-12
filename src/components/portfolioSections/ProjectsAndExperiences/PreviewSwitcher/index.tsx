import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import {AnimatePresence, motion} from 'framer-motion';
import {IProject} from 'IPortfolio';
import React, {useContext, useEffect, useRef, useState} from 'react';
import FullScreenIcon from '../../../../../public/icons/fullScreenIcon';
import PlayIcon from '../../../../../public/icons/play';
import S from './PreviewSwitcher.module.css';

export const PreviewSwitcher: React.FC<Pick<IProject, 'title' | 'image' | 'deployVideo'>> = ({
  title,
  image,
  deployVideo,
}) => {
  const techPreview = `${title} techPreview`;

  const {setSrc} = useContext(GifPreviewContext) as GifPreviewProps;

  const [asGif, setAsGif] = useState(false);

  const gifRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClose = (e: any) => {
      if (e.target.id !== techPreview) setAsGif(false);
    };
    window.addEventListener('click', handleClose);
    window.addEventListener('touchstart', handleClose);
    return () => {
      window.removeEventListener('touchstart', handleClose);
      window.removeEventListener('click', handleClose);
    };
  }, []);

  const img = (
    // included both to eager load
    <div
      className={S.imgContainer}
      key='img'
      style={{position: 'relative', width: '100%', height: '100%'}}
    >
      <motion.img
        id={techPreview}
        style={{position: 'absolute', left: 0, top: 0}}
        transition={{duration: 0.15, ease: 'easeOut'}}
        initial={{opacity: 1}}
        exit={{opacity: 0}}
        src={`./assets/logos/${image}`}
        alt={`${title} logo`}
      />
      <PlayIcon
        onClick={e => {
          e.stopPropagation();
          setAsGif(true);
        }}
      />
    </div>
  );

  const gif = (
    <motion.img
      onTransitionEnd={() => {
        if (asGif) gifRef.current!.focus();
      }}
      ref={gifRef}
      onBlur={() => {
        setAsGif(false);
      }}
      key='img&Gif'
      id={techPreview}
      transition={{duration: 0.15, ease: 'easeOut'}}
      initial={{opacity: 1}}
      exit={{opacity: 0}}
      alt={`${title} logo`}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        border: '2px solid #00000055',
        borderRadius: 5,
      }}
      src={`gifs/${deployVideo}`}
    />
  );

  return (
    <div
      className={S.container}
      style={{
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '100%',
        left: 0,
        transform: 'translateY(-50%)',
      }}
    >
      <AnimatePresence initial={false} mode='wait'>
        {asGif ? (
          <>
            {gif}
            {
              <div
                onClick={() => {
                  if (asGif) setSrc(deployVideo);
                }}
                style={{
                  position: 'absolute',
                  top: '57%',
                  right: 0,
                  margin: 10,
                  cursor: asGif ? 'pointer' : 'default',
                }}
              >
                <FullScreenIcon width={25} />
              </div>
            }
          </>
        ) : (
          img
        )}
      </AnimatePresence>
    </div>
  );
};
