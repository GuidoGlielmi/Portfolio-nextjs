import FullScreenIcon from '../../../../../public/icons/fullScreenIcon';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import {AnimatePresence, motion} from 'framer-motion';
import {IProject} from 'IPortfolio';
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
    const handleTouchEnd = (e: any) => {
      if (e.target.id !== techPreview) setAsGif(false);
    };
    document.addEventListener('touchstart', handleTouchEnd);
    return () => {
      document.removeEventListener('touchstart', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!asGif || !gifRef.current) return;
      setAsGif(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [asGif]);

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
      <PlayIcon onClick={() => setAsGif(true)} />
    </div>
  );

  const gif = (
    <motion.img
      onTransitionEnd={() => {
        console.log(gifRef.current);
        if (asGif) gifRef.current!.focus();
      }}
      ref={gifRef}
      onBlur={() => {
        console.log(123123);
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
                onClick={asGif ? () => setSrc(deployVideo) : undefined}
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
