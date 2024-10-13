import {Link} from '@constants';
import useBreakpoint from 'hooks/useBreakpoint';
import {ISkill, ITechnology, IUser, TechType} from 'IPortfolio';
import React from 'react';
import Skills from './skills/Skills';
import TechsSection from './techs/TechsSection';
import S from './TechsAndInfo.module.css';

type TechsAndInfoProps = {
  techs: [type: TechType[], tech: ITechnology[]];
  user: IUser;
  skills: ISkill[];
  projectsAndExperiencesRef: React.RefObject<HTMLDivElement>;
};

const TechsAndInfo = React.forwardRef<HTMLDivElement, TechsAndInfoProps>(
  ({techs, user, skills, projectsAndExperiencesRef}, ref) => {
    const isDesktop = useBreakpoint();

    return (
      <section
        id={Link.TECHS_AND_INFO}
        ref={ref}
        className={S.techsAndInfoSection}
        onWheel={e => {
          if (!isDesktop || e.deltaY < 0) return;
          projectsAndExperiencesRef.current?.scrollIntoView({behavior: 'smooth'});
        }}
      >
        <TechsSection techs={techs} user={user} />
        <Skills user={user} skills={skills} />
      </section>
    );
  },
);

type TWhenReturn = {
  elseWhen: (newCondition: boolean) => TWhenReturn;
  return: (value: any) => TWhenReturn;
  else: (value: any) => typeof value;
  value?: any | null;
};

export const when: (condition: boolean, value?: any) => TWhenReturn = (condition, value) => ({
  elseWhen: (newCondition: boolean) => when(condition || newCondition, value),
  return: v => when(condition, condition === true ? value ?? v : null),
  else: v => value ?? v,
  value,
});

const when2 = (initialCondition: boolean): TWhenReturn => {
  const value: [any?] = [];
  function trier(condition: boolean): TWhenReturn {
    return {
      elseWhen: trier,
      return(v) {
        if (!value.hasOwnProperty(0) && condition === true) value[0] = v;
        return trier(condition);
      },
      else: v => (value.hasOwnProperty(0) ? value[0] : v),
      value: value.hasOwnProperty(0) ? value[0] : null,
    };
  }
  return trier(initialCondition);
};

export default TechsAndInfo;
