import styles from './EducationItem.module.css';
import {Education} from 'IPortfolio';

type EducationItemProps = {
  education: Education;
};

const EducationItem: React.FC<EducationItemProps> = ({
  education: {educationImg, school, degree, startDate, endDate},
}) => {
  return (
    <div className={styles.educationItem}>
      <div className={styles.educationImgContainer}>
        <img src={educationImg} alt={`${school} logo`} />
      </div>
      <div className={styles.educationInfo}>
        <h3>{degree}</h3>
        <p>{school}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
      </div>
    </div>
  );
};

export default EducationItem;
