import React from 'react';
import {ISkill, ITechnology, IUser} from 'IPortfolio';
import S from './TechsAndInfo.module.css';
import {ReactSVG} from 'react-svg';
import Tabs from 'components/common/tabs/Tabs';
import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Skills from '../skills/Skills';
import useTranslation from 'hooks/useTranslation';

type TechsAndInfoProps = {
  techs: [string[], ITechnology[]];
  user: IUser;
  skills: ISkill[];
  projectsAndExperiencesRef: React.RefObject<HTMLDivElement>;
};
const TechsAndInfo = React.forwardRef<HTMLDivElement, TechsAndInfoProps>(
  ({techs: [types, techs], user, skills, projectsAndExperiencesRef}, ref) => {
    const [selectedTechType, setSelectedTechType] = useState(types[0]);
    const [techsTitle, whoAmITitle] = useTranslation([
      "Technologies I'm familiar with",
      'A little something about me',
    ]);

    return (
      <section
        ref={ref}
        className={S.techsAndInfoSection}
        onWheel={e => {
          if (e.deltaY < 0) return;
          projectsAndExperiencesRef.current?.scrollIntoView({behavior: 'smooth'});
        }}
      >
        <div className={S.techsSection}>
          <h2>{techsTitle}</h2>
          <div className={S.techsContainer}>
            <Tabs
              tabs={types.map(t => [t, techTitleFormatter(t)] as [string, string])}
              onChange={selectedTab => {
                setSelectedTechType(selectedTab);
              }}
            />
            <div className={S.techGroup}>
              <AnimatePresence mode='wait' initial={false}>
                {techs.map(
                  t =>
                    t.type === selectedTechType && (
                      <motion.div
                        key={t.name}
                        transition={{duration: 0.1}}
                        animate={{opacity: 1, scale: 1}}
                        initial={{opacity: 0, scale: 0.5}}
                        exit={{opacity: 0, scale: 0.5}} // necesary for AnimatePresence
                        className={S.tech}
                      >
                        <ReactSVG
                          src={t.image}
                          // key={t.name}
                          beforeInjection={svg => {
                            svg.setAttribute('width', '5vh');
                            svg.setAttribute('height', '5vh');
                          }}
                        />
                        <span>{t.name}</span>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
          {/*         <div style={{marginLeft: 0}}>
          <TypeGroup skills={skills.filter(s => s.type === 'LANGUAGE')} title='Languages' />
        </div> */}
        </div>
        <div className={S.infoContainer}>
          <h2>{whoAmITitle}</h2>
          <p>{user.aboutMe}</p>
          <Skills skills={skills} />
        </div>
      </section>
    );
  },
);

export const when = (condition: boolean, value: any) => ({
  elseWhen: (newCondition: boolean) => when(condition || newCondition, value),
  return: (v: any) => when(condition, condition === true ? value ?? v : null),
  else: (v: any) => value ?? v,
  get: value,
});

export default TechsAndInfo;

const techTitleFormatter = (title: string) => title.replaceAll(/([a-z])([A-Z])/g, '$1-$2');
