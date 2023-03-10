import ExperienceItem from './ExperienceItem';
import styles from './Experiences.module.css';
import {IExperience} from 'IPortfolio';

type ExperienceSectionProps = {
  experiences?: IExperience[];
};

const Experiences: React.FC<ExperienceSectionProps> = ({experiences}) => {
  if (!experiences) return null;
  return (
    <section className={styles.experiencesSection}>
      <h2>My Experiences</h2>
      {experiences.map((e, i) => (
        <ExperienceItem key={e.id + i} experience={e} />
      ))}
    </section>
  );
};
export default Experiences;
