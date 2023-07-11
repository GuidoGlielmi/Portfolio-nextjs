import React, {useState, useEffect, useRef, createContext} from 'react';
import NavBar from 'components/nav-bar/NavBar';
import TechsAndInfo from 'components/portfolioSections/techs-and-info/TechsAndInfo';
import S from './styles.module.css';
// import Head from 'next/head';
// import Script from 'next/script';
// import {wrap} from 'popmotion';
import portfolioService from '../services/portfolioService';
import {IExperience, IProject, ISkill, ITechnology, IUser} from 'IPortfolio';
import Chevron from 'components/common/icons/chevrons/Chevron';
import ProjectsAndExperiences from 'components/portfolioSections/ProjectsAndExperiences';
import {debounce} from 'components/portfolioSections/skills/ProgressRing';
import portfolioData from 'data.json';
import {translate} from '../translator';

export type LanguageGroup = {
  experiences: IExperience[];
  projects: IProject[];
  skills: ISkill[];
  techs: [string[], ITechnology[]];
  user: IUser;
};

export type SectionsProps = {
  en: LanguageGroup;
  es: LanguageGroup;
};

export enum Language {
  es = 'es',
  en = 'en',
}

export const languageContext = createContext<Language>(Language.en);

const Home: React.FC<SectionsProps> = ({en, es}) => {
  const [selectedLang, setSelectedLang] = useState(Language.en);

  const projectsAndExperiencesSectionRef = useRef<HTMLDivElement>(null);
  const techsAndInfoRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const data = selectedLang === Language.en ? en : es;

  useEffect(() => {
    const setArrowPosition = () => {
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
    };
    document.addEventListener('scroll', debounce(setArrowPosition, 100));
    return () => removeEventListener('scroll', setArrowPosition);
  }, []);

  const navigateToSection = () => {
    if (projectsAndExperiencesSectionRef.current === null || techsAndInfoRef.current === null)
      return;
    if (window.scrollY >= techsAndInfoRef.current.clientHeight) {
      techsAndInfoRef.current.scrollIntoView({behavior: 'smooth'});
    } else projectsAndExperiencesSectionRef.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <languageContext.Provider value={selectedLang}>
      <NavBar
        setSelectedLang={setSelectedLang}
        user={data.user}
        refs={[
          {
            title: selectedLang === 'en' ? 'Who Am I' : 'Sobre mí',
            ref: techsAndInfoRef,
          },
          {
            title: selectedLang === 'en' ? 'Projects & Experiences' : 'Projectos & Experiencias',
            ref: projectsAndExperiencesSectionRef,
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
        {/* </motion.div> */}
        {/* </AnimatePresence> */}
        <button
          style={{bottom: '3vh', transform: 'translateX(50%) rotateZ(90deg)'}}
          ref={arrowRef}
          onClick={navigateToSection}
          className={S.navigationArrow}
        >
          <Chevron />
        </button>
        <ProjectsAndExperiences
          ref={projectsAndExperiencesSectionRef}
          projects={data.projects}
          experiences={data.experiences}
        />
      </main>
    </languageContext.Provider>
  );
};

interface ArrowProps {
  action: () => void;
  prev?: boolean;
}

const Arrow: React.FC<ArrowProps> = ({action, prev = false}) => {
  const offset = '20px';
  const style = prev ? {left: offset, transform: 'rotateZ(180deg)'} : {right: offset};
  return (
    <button onClick={action} className={S.arrowContainer} style={style}>
      <Chevron />
    </button>
  );
};

export const getStaticProps = async () => {
  // const [
  //   educations,
  //   educationsEs,
  //   experiences,
  //   experiencesEs,
  //   projects,
  //   projectsEs,
  //   skills,
  //   skillsEs,
  //   techs,
  //   users,
  //   usersEs,
  // ] = await Promise.all([
  //   portfolioService.getEducations(),
  //   portfolioService.getEducations(true),
  //   portfolioService.getExperiences(),
  //   portfolioService.getExperiences(true),
  //   portfolioService.getProjects(),
  //   portfolioService.getProjects(true),
  //   portfolioService.getSkills(),
  //   portfolioService.getSkills(true),
  //   portfolioService.getTechs(),
  //   portfolioService.getUsers(),
  //   portfolioService.getUsers(true),
  // ]);
  const {projects, techs, experiences, user, skills} = portfolioData as {
    projects: IProject[];
    techs: ITechnology[];
    experiences: IExperience[];
    user: IUser;
    skills: ISkill[];
  };
  const techTypes = techs.reduce<string[]>(
    (p, tech: ITechnology) => [...new Set([...p, tech.type])],
    [],
  );

  const getSpanish = <M,>(obj: M | M[]) => {
    const getData = (obj: M) =>
      Object.entries(obj as any).reduce(
        (p, [k, v]: [string, any]) => ({...p, [k]: translate(v) || v}),
        {} as M,
      );
    if (obj instanceof Array) return obj.map(getData);
    return getData(obj);
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
