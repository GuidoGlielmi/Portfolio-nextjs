import {useRef} from 'react';
import TechItem from './TechItem';
import styles from './Techs.module.css';
import {ITechnology} from 'IPortfolio';

type TechsProps = {
  techs: ITechnology[];
};

const Techs: React.FC<TechsProps> = ({techs}) => {
  const techImg = useRef<HTMLImageElement>(null);
  const techsContainer = useRef<HTMLDivElement>(null);

  function onWheel(e: React.WheelEvent) {
    const scrollUnit = techImg.current?.offsetWidth || 0;
    const currentValue = techsContainer.current?.scrollLeft || 0;
    const maxValue = (techsContainer.current?.scrollWidth || 0) - (techsContainer.current?.clientWidth || 0);
    const totalWidth = techsContainer.current?.scrollWidth || 0;
    if (e.deltaY > 0) {
      if (maxValue - currentValue < scrollUnit) {
        techsContainer.current?.scrollTo({
          left: currentValue - totalWidth / 2,
          top: 0,
          behavior: 'auto',
        });
        techsContainer.current?.scrollTo({
          left: currentValue - totalWidth / 2 + scrollUnit,
          top: 0,
          behavior: 'smooth',
        });
      } else {
        techsContainer.current?.scrollTo({
          left: currentValue + scrollUnit,
          top: 0,
          behavior: 'smooth',
        });
      }
    } else if (currentValue - scrollUnit < scrollUnit) {
      techsContainer.current?.scrollTo({
        left: currentValue - totalWidth / 2,
        top: 0,
        behavior: 'auto',
      });
      techsContainer.current?.scrollTo({
        left: totalWidth / 2 + Math.abs(currentValue - scrollUnit),
        top: 0,
        behavior: 'smooth',
      });
    } else {
      techsContainer.current?.scrollTo({
        left: currentValue - scrollUnit,
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className={styles.techsSection}>
      <h3>Some technologies i&apos;m familiar with</h3>
      <div ref={techsContainer} onWheel={onWheel} className={styles.techsContainer}>
        {techs.map(t => (
          <TechItem tech={t} key={t.id} ref={techImg} />
        ))}
        {techs.map(t => (
          <TechItem tech={t} key={t.id} ref={techImg} />
        ))}
      </div>
    </div>
  );
};

export default Techs;
