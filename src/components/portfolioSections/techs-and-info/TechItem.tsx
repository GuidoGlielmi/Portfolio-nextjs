import {useRef, forwardRef} from 'react';
import styles from './TechItem.module.css';
import {ITechnology} from 'IPortfolio';

type TechItemProps = {
  tech: ITechnology;
};

const TechItem = forwardRef<HTMLImageElement, TechItemProps>(({tech}, ref) => {
  const techNode = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.techContainer} ref={techNode}>
      <div className={styles.techImageContainer}>
        <img src={tech.techImg} alt={`${tech.name} logo`} title={tech.name} ref={ref} />
      </div>
    </div>
  );
});
export default TechItem;
