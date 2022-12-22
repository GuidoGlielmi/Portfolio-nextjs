import React, {Key, useRef, useState} from 'react';
import {motion} from 'framer-motion';
// import {CSSTransition, SwitchTransition} from 'react-transition-group';
import data from '../../data.json';
import NavBar from 'components/nav-bar/NavBar';
import TechsAndInfo from 'components/portfolioSections/techs-and-info/TechsAndInfo';
import Projects from 'components/portfolioSections/projects/Projects';
import Education from 'components/portfolioSections/education/Education';
import Experiences from 'components/portfolioSections/experiences/Experiences';
import Skills from 'components/portfolioSections/skills/Skills';
import styles from './styles.module.css';
import Head from 'next/head';
import portfolioService from '../../services/portfolioService';
import HandRight from '../../public/icons/HandRight';
import Script from 'next/script';
import {IEducation, IExperience, IProject, ISkill, ITechnology, IUser} from 'IPortfolio';

const sectionsNames = ['Who am I', 'Projects', 'Experiences', 'My education', 'My skills'];
type SectionsProps2 = {
  educations: IEducation[];
  experiences: IExperience[];
  projects: IProject[];
  skills: ISkill[];
  techs: ITechnology[];
  user: IUser;
};
const Home: React.FC<SectionsProps2> = ({user, educations, experiences, projects, skills, techs}) => {
  const sections = [
    <TechsAndInfo user={user} techs={techs} />,
    <Projects projects={projects} />,
    <Experiences experiences={experiences} />,
    <Education educations={educations} />,
    <Skills skills={skills} />,
  ];
  const [sectionIndex, setSectionIndex] = useState(0);
  const [state, setState] = useState(true);

  const section = useRef<HTMLDivElement>(null);

  function triggerAnimation(i: number) {
    if (sectionIndex === i) return;
    setState(ps => !ps);
    setSectionIndex(i);
  }

  const nextSection = () => {
    triggerAnimation(sectionIndex === sections.length - 1 ? 0 : sectionIndex + 1);
  };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{
        type: 'spring',
      }}
    >
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <Script src='https://kit.fontawesome.com/8f51ab7548.js' crossOrigin='anonymous' />
      </Head>
      <NavBar user={user} sectionIndex={sectionIndex} triggerAnimation={triggerAnimation} />
      <main className={styles.main}>
        <Arrow action={nextSection} />
        <div className={styles.bottomPart}>
          <Sections ref={section} state={state.toString()} sections={sections} index={sectionIndex} />
        </div>
      </main>
    </motion.div>
  );
};

interface ArrowProps {
  action: () => void;
}

const Arrow: React.FC<ArrowProps> = ({action}) => {
  return (
    <div>
      <div className={styles.arrowTrack}>
        <div>
          <button onClick={action} className={styles.arrowContainer}>
            <HandRight fillContainer color='#dd9f4f' />
          </button>
        </div>
      </div>
    </div>
  );
};

interface SectionLinksProps {
  index: number;
  triggerAnimation: (i: number) => void;
}

const SectionLinks: React.FC<SectionLinksProps> = ({index, triggerAnimation}) => (
  <div className={styles.sectionLinks}>
    {sectionsNames.map((sn, i) => (
      <span
        key={sn + i}
        onClick={() => triggerAnimation(i)}
        className={index === i ? styles.clickedSectionLink : undefined}
      >
        {sn}
      </span>
    ))}
  </div>
);

interface SectionsProps {
  index: number;
  state: Key | null | undefined;
  sections: JSX.Element[];
}

const Sections = React.forwardRef<HTMLDivElement, SectionsProps>(({index, state, sections}, ref) => (
  <div ref={ref} className={styles.sectionsContainer}>
    <motion.div
      initial={{x: '-100vw'}}
      animate={{x: '0vw'}}
      exit={{opacity: '100vw'}}
      transition={{
        type: 'spring',
      }}
    >
      {sections[index]}
    </motion.div>
  </div>
));
/* const Sections = React.forwardRef<HTMLDivElement, SectionsProps>(({index, state, sections}, ref) => (
  <div ref={ref} className={styles.sectionsContainer}>
    <SwitchTransition>
      <CSSTransition
        key={state}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames='fade'
      >
        {sections[index]}
      </CSSTransition>
    </SwitchTransition>
  </div>
)); */

export const getStaticProps = async () => {
  try {
    const educations = await portfolioService.getEducations();
    // console.log(educations);
    const experiences = await portfolioService.getExperiences();
    // console.log(experiences);
    const projects = await portfolioService.getProjects();
    // console.log(projects);
    const skills = await portfolioService.getSkills();
    // console.log(skills);
    const techs = await portfolioService.getTechs();
    // console.log(techs);
    const users = await portfolioService.getUsers();
    return {
      props: {
        educations,
        experiences,
        projects,
        skills,
        techs,
        user: users?.[0],
      },
      revalidate: 300,
    };
  } catch (err) {
    console.log(err);
  }
  const parsedData = data as SectionsProps2;
  return {
    props: parsedData,
  };
};

export default Home;
