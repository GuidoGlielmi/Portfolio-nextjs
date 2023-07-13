import FullScreenIcon from '../../../../../public/icons/fullScreenIcon';
import React, {useState, useContext} from 'react';
import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import {AnimatePresence, motion} from 'framer-motion';
import {IProject} from 'IPortfolio';

export const PreviewSwitcher: React.FC<Pick<IProject, 'title' | 'image' | 'deployVideo'>> = ({
  title,
  image,
  deployVideo,
}) => {
  const {setSrc} = useContext(GifPreviewContext) as GifPreviewProps;
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
      onClick={() => setImageHovered(ps => !ps)}
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
        {/* included both to eager load */}
        <motion.img
          style={{position: 'absolute', left: 0, top: 0}}
          transition={{duration: 0.15, ease: 'easeOut'}}
          animate={!imageHovered ? 'open' : 'closed'}
          variants={variants}
          src={image}
          alt={`${title} logo`}
        />
        <motion.img
          transition={{duration: 0.15, ease: 'easeOut'}}
          animate={imageHovered ? 'open' : 'closed'}
          variants={variants}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            border: '2px solid #00000055',
            borderRadius: '5px !important',
          }}
          src={`gifs/${deployVideo}`}
          alt={`${title} logo`}
        />
        {imageHovered && (
          <div
            onClick={imageHovered ? () => setSrc(deployVideo) : undefined}
            style={{
              position: 'absolute',
              top: '57%',
              right: 0,
              margin: 10,
              cursor: imageHovered ? 'pointer' : 'default',
            }}
          >
            <FullScreenIcon width={25} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const variants = {
  open: {opacity: 1},
  closed: {opacity: 0},
};
