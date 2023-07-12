import {IExperience} from 'IPortfolio';
import React, {useEffect, useRef} from 'react';
import ExperienceItem from './ExperienceItem/ExperienceItem';
import useTranslation from 'hooks/useTranslation';

type ExperiencesProps = {
  experiences: IExperience[];
};

let initialOffsetTop: number;
const Experiences: React.FC<ExperiencesProps> = ({experiences}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [experiencesTitle] = useTranslation('Experiences');

  useEffect(() => {
    initialOffsetTop = titleRef.current!.offsetTop;
    const paintBackground = () => {
      // console.log(containerRef.current!.offsetTop);
      // console.log(titleRef.current!.offsetTop);
      if (titleRef.current!.offsetTop > initialOffsetTop) {
        titleRef.current!.style.background = '#393939';
        titleRef.current!.style.color = 'white';
      } else {
        titleRef.current!.style.background = 'transparent';
        titleRef.current!.style.color = '';
      }
    };
    paintBackground();
    document!.addEventListener('scroll', paintBackground);
    return () => {
      document!.removeEventListener('scroll', paintBackground);
    };
  }, []);

  return (
    <div>
      <h2 ref={titleRef}>{experiencesTitle}</h2>
      {experiences.map(e => (
        <ExperienceItem experience={e} key={e.title} />
      ))}
    </div>
  );
};

export default Experiences;
