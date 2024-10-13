import {SkillType} from '@constants';
import useTranslation from 'hooks/useTranslation';
import S from './Skills.module.css';
import {TypeGroup} from './typeGroup';

type SkillSectionProps = {
  user: IUser;
  skills: ISkill[];
};

const Skills: React.FC<SkillSectionProps> = ({user, skills}) => {
  if (!skills) return null;

  const [peopleSkills, languages, whoAmITitle] = useTranslation([
    'People Skills',
    'Languages',
    'A little something about me',
  ]);

  const groups = skills?.reduce<{[key in SkillType]: ISkill[]}>(
    (p, c) => ({...p, [c.type]: p[c.type] ? [...p[c.type], c] : [c]}),
    {} as {[key in SkillType]: ISkill[]},
  );

  return (
    <div className={S.infoContainer}>
      <h2>{whoAmITitle}</h2>
      <p>{user.aboutMe}</p>
      <section className={S.skillsSection}>
        <TypeGroup skills={groups['HARDANDSOFT']} title={peopleSkills} />
        <TypeGroup skills={groups['LANGUAGE']} title={languages} />
      </section>
    </div>
  );
};

export default Skills;
