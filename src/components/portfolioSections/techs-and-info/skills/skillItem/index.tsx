import {ISkill} from 'IPortfolio';
import S from './SkillItem.module.css';

type SkillItemProps = {skill: ISkill};

const SkillItem: React.FC<SkillItemProps> = ({skill}) => {
  return (
    <div className={S.skillContainer}>
      <div className={S.skill}>
        <p>{skill.name}</p>
      </div>
    </div>
  );
};

export default SkillItem;
