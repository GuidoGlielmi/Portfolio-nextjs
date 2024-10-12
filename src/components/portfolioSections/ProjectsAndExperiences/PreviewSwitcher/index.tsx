import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import useEventListener from 'components/custom-hooks/useEventListener';
import {AnimatePresence, motion} from 'framer-motion';
import {IProject} from 'IPortfolio';
import React, {useContext, useRef, useState} from 'react';
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

  const handleClose = (e: any) => {
    if (e.target.id !== techPreview) setAsGif(false);
  };
  useEventListener('click', handleClose, false);
  useEventListener('touchstart', handleClose, false);

  const img = (
    // included both to eager load
    <div className={S.imgContainer} key='img'>
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
        gifRef.current!.focus();
      }}
      ref={gifRef}
      key='img&Gif'
      id={techPreview}
      transition={{duration: 0.15, ease: 'easeOut'}}
      initial={{opacity: 1}}
      exit={{opacity: 0}}
      alt={`${title} logo`}
      style={{
        border: '2px solid #00000055',
        borderRadius: 5,
      }}
      src={`gifs/${deployVideo}`}
    />
  );

  return (
    <div className={S.container}>
      <AnimatePresence initial={false} mode='wait'>
        {asGif ? (
          // div container to make the full screen icon positioned relative to gif sibling
          <div style={{position: 'relative', display: 'flex'}}>
            {gif}
            <div className={S.fullScreenIconContainer} onClick={() => setSrc(deployVideo)}>
              <FullScreenIcon width={25} />
            </div>
          </div>
        ) : (
          img
        )}
      </AnimatePresence>
    </div>
  );
};
