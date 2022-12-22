import EducationItem from './EducationItem';
import styles from './Education.module.css';
import {IEducation} from 'IPortfolio';

type EducationSectionProps = {
  educations?: IEducation[];
};

const IEducation: React.FC<EducationSectionProps> = ({educations}) => {
  if (!educations) return null;
  return (
    <section className={styles.educationSection}>
      <h2>My studies</h2>
      <div className={styles.educations}>
        {educations.map((e, i) => (
          <EducationItem education={e} key={e.id + i} />
        ))}
      </div>
    </section>
  );
};
export default IEducation;
