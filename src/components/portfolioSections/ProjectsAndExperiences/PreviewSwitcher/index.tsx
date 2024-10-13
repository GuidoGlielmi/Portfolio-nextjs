import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import useEventListener from 'components/custom-hooks/useEventListener';
import {motion, Variant} from 'framer-motion';
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

  const variants: {
    [key: string]: Variant;
  } = {
    open: {opacity: 1, zIndex: 1, transition: {duration: 0.3, ease: [0.54, 0, 0.23, -0.13]}},
    closed: {opacity: 0, zIndex: 0, transition: {duration: 0.3, ease: [0.59, 0.95, 0.3, 1.04]}},
  };

  return (
    <div className={S.container}>
      {/* rendered both img and gif to eager load */}
      {/* div container to make the full screen icon positioned relative to gif sibling */}
      <motion.div
        variants={variants}
        animate={asGif ? 'open' : 'closed'}
        style={{position: 'absolute', display: 'flex'}}
        key='gifContainer'
      >
        <img
          loading='eager'
          onTransitionEnd={() => {
            gifRef.current!.focus();
          }}
          ref={gifRef}
          id={techPreview}
          alt={`${title} logo`}
          style={{
            border: '2px solid #00000055',
            borderRadius: 5,
          }}
          src={`gifs/${deployVideo}`}
        />
        <div className={S.fullScreenIconContainer} onClick={() => setSrc(deployVideo)}>
          <FullScreenIcon width={25} />
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        animate={asGif ? 'closed' : 'open'}
        className={S.imgContainer}
        key='img'
      >
        <img
          id={techPreview}
          style={{position: 'absolute', left: 0, top: 0}}
          src={`./assets/logos/${image}`}
          alt={`${title} logo`}
        />
        <PlayIcon
          onClick={e => {
            e.stopPropagation();
            setAsGif(true);
          }}
        />
      </motion.div>
    </div>
  );
};
