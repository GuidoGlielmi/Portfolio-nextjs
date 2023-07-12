import S from './ExperienceItem.module.css';
import {IExperience, IProject} from 'IPortfolio';
import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import useBreakpoint from 'hooks/useBreakpoint';

type ExperienceItemProps = {
  experience: IExperience;
};

const ExperienceItem: React.FC<ExperienceItemProps> = ({experience}) => {
  return (
    <div className={S.experienceContainer}>
      <figure style={{position: 'relative'}} className={S.experienceImgContainer}>
        {experience.deployVideo ? (
          <PreviewSwitcher
            title={experience.title}
            image={experience.image}
            deployVideo={experience.deployVideo}
          />
        ) : (
          <img src={experience.image} alt={`${experience.title} logo`} />
        )}
      </figure>
      <div className={S.info}>
        <h3>{experience.title}</h3>
        <span>
          {experience.startDate} - {experience.endDate}
        </span>
        <p>{experience.description}</p>
        {experience.deployUrl && (
          <div className={S.urls}>
            <a href={experience.deployUrl} target='_blank' rel='noreferrer'>
              Live App
            </a>
          </div>
        )}
        {experience.certificate && (
          <a href={experience.certificate} target='_blank' rel='noreferrer'>
            Certificate
          </a>
        )}
        <div className={S.urls}>
          {experience.urls.map((u, i) => (
            <a href={u.url} target='_blank' rel='noreferrer' key={u.name + i}>
              {`${u.name} Repo`}
            </a>
          ))}
        </div>
        <div className={S.techs}>
          {experience.techs?.map((t, i) => (
            <span key={t + i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PreviewSwitcher: React.FC<Pick<IProject, 'title' | 'image' | 'deployVideo'>> = ({
  title,
  image,
  deployVideo,
}) => {
  const isDesktop = useBreakpoint();

  const [imageHovered, setImageHovered] = useState(false);

  return (
    <AnimatePresence initial={false}>
      <div
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
        onClick={() => setImageHovered(ps => !ps)}
        style={{position: 'absolute', top: 0, left: 0}}
      >
        <motion.img
          transition={{duration: 0.25, ease: 'easeOut'}}
          initial={{
            opacity: 0,
            ...(imageHovered && {transform: `scale(${isDesktop ? 1.5 : 1})`}),
          }}
          animate={{
            opacity: 1,
            ...(imageHovered && {transform: `scale(${isDesktop ? 2.5 : 1.5})`}),
          }}
          exit={{opacity: 0}}
          key={`${imageHovered}`}
          className={imageHovered ? S.gif : ''}
          src={!imageHovered ? image : `gifs/${deployVideo}`}
          alt={`${title} logo`}
        />
      </div>
    </AnimatePresence>
  );
};

export default ExperienceItem;
