import FullScreenIcon from '../../../../../public/icons/fullScreenIcon';
import React, {useState, useContext, useEffect} from 'react';
import {GifPreviewContext, GifPreviewProps} from 'components/contexts/gifPreview';
import {AnimatePresence, motion} from 'framer-motion';
import {IProject} from 'IPortfolio';

export const PreviewSwitcher: React.FC<Pick<IProject, 'title' | 'image' | 'deployVideo'>> = ({
  title,
  image,
  deployVideo,
}) => {
  const techPreview = `${title} techPreview`;
  const {setSrc} = useContext(GifPreviewContext) as GifPreviewProps;
  const [imageHovered, setImageHovered] = useState(false);
  useEffect(() => {
    const handleTouchEnd = (e: any) => {
      if (e.target.id !== techPreview) setImageHovered(false);
    };
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  const img = (
    // included both to eager load
    <motion.img
      key='img'
      id={techPreview}
      style={{position: 'absolute', left: 0, top: 0}}
      transition={{duration: 0.15, ease: 'easeOut'}}
      initial={{opacity: 1}}
      exit={{opacity: 0}}
      src={image}
      alt={`${title} logo`}
    />
  );

  const gif = (
    <motion.img
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
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
      onTouchStart={() => setImageHovered(true)}
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
        {imageHovered ? (
          <>
            {gif}
            {
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
            }
          </>
        ) : (
          img
        )}
      </AnimatePresence>
    </div>
  );
};
