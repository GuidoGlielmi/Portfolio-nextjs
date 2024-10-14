import {Link, TechType} from '@constants';
import useEventListener from '@hooks/useEventListener';
import {LanguageContext, LanguageProps} from 'components/contexts/language';
import NavBar from 'components/nav-bar/NavBar';
import ProjectsAndExperiences from 'components/portfolioSections/ProjectsAndExperiences';
import TechsAndInfo from 'components/portfolioSections/techs-and-info/TechsAndInfo';
import portfolioData from 'data.json';
import {debounce} from 'helpers/debounce';
import React, {useContext, useRef} from 'react';
import {translate} from '../src/helpers/translator';
import S from './styles.module.css';

export type LanguageGroup = {
  experiences: IExperience[];
  projects: IProject[];
  skills: ISkill[];
  techs: [TechType[], ITechnology[]];
  user: IUser;
};

export type SectionsProps = {
  en: LanguageGroup;
  es: LanguageGroup;
};

const Home: React.FC<SectionsProps> = ({en, es}) => {
  const {eng} = useContext(LanguageContext) as LanguageProps;
  const projectsAndExperiencesSectionRef = useRef<HTMLDivElement>(null);
  const techsAndInfoRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const data = eng ? en : es;

  const setArrowPosition = debounce(() => {
    if (arrowRef.current === null || techsAndInfoRef.current === null) return;

    if (window.scrollY >= techsAndInfoRef.current.clientHeight) {
      if (arrowRef.current.style.bottom === '3vh') {
        arrowRef.current.style.bottom = '85vh';
        arrowRef.current.style.transform = 'translateX(50%) rotateZ(-90deg)';
      }
    } else if (arrowRef.current.style.bottom === '85vh') {
      arrowRef.current.style.bottom = '3vh';
      arrowRef.current.style.transform = 'translateX(50%) rotateZ(90deg)';
    }
  }, 100);
  useEventListener({event: 'scroll', fn: setArrowPosition});

  return (
    <>
      <h1 style={{position: 'fixed', background: 'transparent'}}>Guido Glielmi</h1>
      <NavBar
        user={data.user}
        refs={[
          {
            title: translate('Who am I', eng),
            ref: techsAndInfoRef,
            href: '#' + Link.TECHS_AND_INFO,
          },
          {
            title: translate('Projects & Experiences', eng),
            ref: projectsAndExperiencesSectionRef,
            href: '#' + Link.PROJECTS_AND_EXPERIENCES,
          },
        ]}
      />
      <main className={S.main}>
        <TechsAndInfo
          user={data.user}
          techs={data.techs}
          skills={data.skills}
          ref={techsAndInfoRef}
          projectsAndExperiencesRef={projectsAndExperiencesSectionRef}
        />
        <ProjectsAndExperiences
          ref={projectsAndExperiencesSectionRef}
          projects={data.projects}
          experiences={data.experiences.sort((a, b) => (a.startDate < b.startDate ? 1 : -1))}
        />
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const {projects, techs, experiences, user, skills} = portfolioData as {
    projects: IProject[];
    techs: ITechnology[];
    experiences: IExperience[];
    user: IUser;
    skills: ISkill[];
  };
  const techTypes = [...new Set(techs.map(t => t.type))];

  const getSpanish = <M,>(obj: Es<M> | Es<M>[]) => {
    if (obj instanceof Array) return obj.map(obj => ({...obj, ...obj.es}));
    return {...obj, ...obj.es};
  };

  return {
    props: {
      en: {
        experiences,
        projects,
        skills,
        techs: [techTypes, techs],
        user,
      },
      es: {
        experiences: getSpanish(experiences),
        projects: getSpanish(projects),
        skills: getSpanish(skills),
        techs: [techTypes, techs],
        user: getSpanish(user),
      },
    },
  };
};

export default Home;
