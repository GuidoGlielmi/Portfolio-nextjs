import {BACKGROUND_ID} from '@constants';
import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import useEventListener from 'components/custom-hooks/useEventListener';
import {motion, Variant} from 'framer-motion';
import {IProject} from 'IPortfolio';
import React, {useContext, useRef, useState} from 'react';
import FullScreenIcon from '../../../../../public/icons/fullScreenIcon';
import PlayIcon from '../../../../../public/icons/play';
import S from './PreviewSwitcher.module.css';

const variants: {
  [key: string]: Variant;
} = {
  open: {opacity: 1, zIndex: 1, transition: {duration: 0.3, ease: [0.54, 0, 0.23, -0.13]}},
  closed: {opacity: 0, zIndex: 0, transition: {duration: 0.3, ease: [0.59, 0.95, 0.3, 1.04]}},
};

export const PreviewSwitcher: React.FC<Pick<IProject, 'title' | 'image' | 'deployVideo'>> = ({
  title,
  image,
  deployVideo,
}) => {
  const appPreview = `${title} appPreview`;

  const {setSrc} = useContext(GifPreviewContext) as GifPreviewProps;

  const [asGif, setAsGif] = useState(false);

  const gifRef = useRef<HTMLImageElement>(null);

  const handleClose = (e: any) => {
    if (
      e.target.id === appPreview ||
      e.target.parentElement.id === appPreview ||
      e.target.id === BACKGROUND_ID
    ) {
      return;
    }
    setAsGif(false);
  };
  useEventListener('click', handleClose);
  useEventListener('touchstart', handleClose);

  const setGif = () => setSrc(deployVideo);

  return (
    <div className={S.container}>
      {/* rendered both img and gif to eager load */}
      {/* div container to make the full screen icon positioned relative to gif sibling */}
      <motion.div
        className={S.gifContainer}
        variants={variants}
        animate={asGif ? 'open' : 'closed'}
        key='gif'
        id={appPreview}
      >
        <img
          loading='eager'
          onTransitionEnd={() => {
            gifRef.current!.focus();
          }}
          ref={gifRef}
          id={appPreview}
          alt={`${title} app preview gif`}
          src={`gifs/${deployVideo}`}
        />
        <button className={S.fullScreenIconContainer} onClick={setGif}>
          <FullScreenIcon width={25} />
        </button>
      </motion.div>
      <motion.div
        variants={variants}
        animate={asGif ? 'closed' : 'open'}
        className={S.imgContainer}
        key='img'
      >
        <img
          style={{position: 'absolute', top: 0}}
          src={`./assets/logos/${image}`}
          alt={`${title} logo`}
        />
        <button
          onClick={e => {
            e.stopPropagation();
            setAsGif(true);
          }}
        >
          <PlayIcon />
        </button>
      </motion.div>
    </div>
  );
};
