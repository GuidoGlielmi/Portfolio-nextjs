import SkillItem from './SkillItem';
import styles from './Skills.module.css';
import {ISkill} from 'IPortfolio';
import useTranslation from 'hooks/useTranslation';

type SkillSectionProps = {
  skills: ISkill[];
};

const Skills: React.FC<SkillSectionProps> = ({skills}) => {
  if (!skills) return null;
  const [peopleSkills, languages] = useTranslation(['People Skills', 'Languages']);
  const groups = skills?.reduce(
    (p: any, c: any) => ({...p, [c.type]: p[c.type] ? [...p[c.type], c] : [c]}),
    {},
  );
  return (
    <section className={styles.skillsSection}>
      <TypeGroup skills={groups['HARDANDSOFT']} title={peopleSkills} />
      <TypeGroup skills={groups['LANGUAGE']} title={languages} />
    </section>
  );
};

type TypeGroupProps = {
  title: string;
  skills: any;
};

export const TypeGroup: React.FC<TypeGroupProps> = ({title, skills}) => {
  return (
    <div className={styles.group}>
      <h2>{title}</h2>
      <div className={styles.skills}>
        {skills.map((s: any) => (
          <SkillItem skill={s} key={s.name} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
