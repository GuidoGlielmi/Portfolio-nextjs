import ProgressRing from './ProgressRing';
import styles from './SkillItem.module.css';
import {ISkill} from 'IPortfolio';

type SkillItemProps = {
  skill: ISkill;
};

const SkillItem: React.FC<SkillItemProps> = ({skill}) => {
  return (
    <div className={styles.skillContainer}>
      <div className={styles.skill}>
        <p>{skill.name}</p>
        <ProgressRing percentage={skill.abilityPercentage} />
      </div>
    </div>
  );
};

export default SkillItem;
