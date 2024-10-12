import {ISkill} from 'IPortfolio';
import SkillItem from '../skillItem';
import S from './TypeGroup.module.css';

type TypeGroupProps = {
  title: string;
  skills: ISkill[];
};

export const TypeGroup: React.FC<TypeGroupProps> = ({title, skills}) => {
  return (
    <div className={S.group}>
      <h2>{title}</h2>
      <div className={S.skills}>
        {skills.map(s => (
          <SkillItem skill={s} key={s.name} />
        ))}
      </div>
    </div>
  );
};
