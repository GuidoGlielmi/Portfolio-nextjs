import styles from './ExperienceItem.module.css';
import {IExperience} from 'IPortfolio';

type ExperienceItemProps = {
  experience: IExperience;
};

const ExperienceItem: React.FC<ExperienceItemProps> = ({experience}) => {
  return (
    <div className={styles.experienceContainer}>
      <div>
        <div className={styles.experienceImgContainer}>
          <img src={experience.experienceImg} alt={`${experience.title} logo`} />
        </div>
        <div className={styles.experienceInfo}>
          <h3>{experience.title}</h3>
          <span>
            {experience.startDate} - {experience.endDate}
          </span>
          <p>{experience.description}</p>
          {experience.certificate && (
            <a href={experience.certificate} target='_blank' rel='noreferrer'>
              Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExperienceItem;
