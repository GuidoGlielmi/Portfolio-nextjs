import React, {Key, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
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
import Script from 'next/script';
import {IEducation, IExperience, IProject, ISkill, ITechnology, IUser} from 'IPortfolio';
import {wrap} from 'popmotion';
import Chevron from 'components/common/icons/chevrons/Chevron';

// const sectionsNames = ['Who am I', 'Projects', 'Experiences', 'My education', 'My skills'];
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

  const section = useRef<HTMLDivElement>(null);

  const setSectionIndex = (i: number) => {
    setPage(pp => [i, pp[1]]);
  };
  const [[page, direction], setPage] = useState([0, 0]);
  const sectionIndex = wrap(0, sections.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100vw' : '-100vw',
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? '100vw' : '-100vw',
        opacity: 0,
      };
    },
  };
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  return (
    <>
      <NavBar user={user} sectionIndex={sectionIndex} setSectionIndex={setSectionIndex} />
      <main className={styles.main}>
        <Arrow action={() => paginate(1)} />
        <Arrow action={() => paginate(-1)} prev />
        <div className={styles.bottomPart}>
          <AnimatePresence initial={false} custom={direction}>
            <div ref={section} className={styles.sectionsContainer}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  x: {type: 'spring', stiffness: 300, damping: 30},
                  opacity: {duration: 0.2},
                }}
                drag='x'
                dragConstraints={{left: 0, right: 0}}
                dragElastic={1}
                onDragEnd={(e, {offset, velocity}) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) paginate(1);
                  else if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
              >
                {sections[sectionIndex]}
              </motion.div>
            </div>
          </AnimatePresence>
          {/* <Sections ref={section} state={state.toString()} sections={sections} index={sectionIndex} /> */}
        </div>
      </main>
    </>
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
    <button onClick={action} className={styles.arrowContainer} style={style}>
      <Chevron />
    </button>
  );
};

interface SectionsProps {
  index: number;
  state: Key | null | undefined;
  sections: JSX.Element[];
}

const Sections = React.forwardRef<HTMLDivElement, SectionsProps>(({index, state, sections}, ref) => (
  <div ref={ref} className={styles.sectionsContainer}>
    <motion.div initial={{x: '50vw'}} animate={{x: '0vw'}} exit={{x: '-100vw'}}>
      {sections[index]}
    </motion.div>
  </div>
));

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
