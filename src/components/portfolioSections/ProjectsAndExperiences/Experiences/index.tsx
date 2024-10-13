import usePaintOnStickyElementScroll from '@hooks/usePaintOnStickyElementScroll';
import useTranslation from 'hooks/useTranslation';
import React, {useRef} from 'react';
import ExperienceItem from './ExperienceItem/ExperienceItem';

type ExperiencesProps = {
  experiences: IExperience[];
};

const Experiences: React.FC<ExperiencesProps> = ({experiences}) => {
  const [experiencesTitle] = useTranslation('Experiences');

  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  usePaintOnStickyElementScroll('#393939', 'white', titleRef, titleContainerRef);

  return (
    <div ref={titleContainerRef}>
      <h2 ref={titleRef}>{experiencesTitle}</h2>
      {experiences.map(e => (
        <ExperienceItem experience={e} key={e.title} />
      ))}
    </div>
  );
};

export default Experiences;
