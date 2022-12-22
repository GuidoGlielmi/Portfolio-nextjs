import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import Button from 'components/common/button/Button';
import SkillItem from './SkillItem';
import styles from './Skills.module.css';
import {ISkill} from 'IPortfolio';

type SkillSectionProps = {
  skills?: ISkill[];
};

const Skills: React.FC<SkillSectionProps> = ({skills}) => {
  if (!skills) return null;
  const groups = skills?.reduce((p: any, c: any) => ({...p, [c.type]: p[c.type] ? [...p[c.type], c] : [c]}), {});
  return (
    <section className={styles.skillsSection}>
      {Object.entries(groups).map(([title, skills]) => (
        <TypeGroup title={title} skills={skills} key={title} />
      ))}
    </section>
  );
};

type TypeGroupProps = {
  title: string;
  skills: any;
};

const TypeGroup: React.FC<TypeGroupProps> = ({title, skills}) => {
  return (
    <div className={styles.group}>
      <h2>{title}</h2>
      <div className={styles.skills}>
        {skills.map((s: any, i: number) => (
          <SkillItem skill={s} key={s.id + i} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
