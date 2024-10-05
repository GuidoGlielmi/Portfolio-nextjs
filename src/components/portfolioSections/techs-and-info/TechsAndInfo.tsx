import LoadingIcon from 'components/common/icons/loading-icon/LoadingIcon';
import Tabs from 'components/common/tabs/Tabs';
import {AnimatePresence, motion} from 'framer-motion';
import useBreakpoint from 'hooks/useBreakpoint';
import useTranslation from 'hooks/useTranslation';
import {ISkill, ITechnology, IUser, TechType} from 'IPortfolio';
import React, {useState} from 'react';
import {ReactSVG} from 'react-svg';
import Chevron from '../../../../public/icons/chevron';
import Skills from '../skills/Skills';
import S from './TechsAndInfo.module.css';

const articles = [
  {
    title: 'Memory reference in Javascript',
    url: 'https://medium.com/@guidoglielmi/memory-reference-in-javascript-d31cf66accb6',
  },
  {
    title: 'Sensible ‘this’ keyword translation',
    url: 'https://medium.com/@guidoglielmi/sensible-this-keyword-translation-300c7b79e033',
  },
  {
    title: 'Getting to know .reduce() on Javascript',
    url: 'https://medium.com/@guidoglielmi/getting-to-know-reduce-on-javascript-82841d8fb5f5',
  },
  {
    title: 'JS Iterators & Generators',
    url: 'https://medium.com/@guidoglielmi/js-iterators-generators-8608f1e18564',
  },
];

type TechsAndInfoProps = {
  techs: [type: TechType[], tech: ITechnology[]];
  user: IUser;
  skills: ISkill[];
  projectsAndExperiencesRef: React.RefObject<HTMLDivElement>;
};
const TechsAndInfo = React.forwardRef<HTMLDivElement, TechsAndInfoProps>(
  ({techs: [types, techs], user, skills, projectsAndExperiencesRef}, ref) => {
    const isDesktop = useBreakpoint();

    const [selectedTechType, setSelectedTechType] = useState(types[0]);
    const [techsTitle, whoAmITitle, articlesTitle] = useTranslation([
      "Technologies I'm familiar with",
      'A little something about me',
      "I've written some articles in Medium™",
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const nextIndex = () => {
      setSelectedIndex(pi => (pi === articles.length - 1 ? 0 : pi + 1));
    };

    return (
      <section
        ref={ref}
        className={S.techsAndInfoSection}
        onWheel={e => {
          if (!isDesktop || e.deltaY < 0) return;
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
                {techs
                  .filter(t => t.type === selectedTechType)
                  .map(t => (
                    <motion.div
                      key={t.name}
                      transition={{duration: 0.1}}
                      animate={{opacity: 1, scale: 1}}
                      initial={{opacity: 0, scale: 0.5}}
                      exit={{opacity: 0, scale: 0.5}} // necesary for AnimatePresence
                      className={S.tech}
                    >
                      <ReactSVG
                        src={`assets/logos/${t.image}.svg`}
                        loading={() => <LoadingIcon />}
                        // beforeInjection={svg => {
                        //   svg.setAttribute('width', '45px');
                        //   svg.setAttribute('height', '45px');
                        // }}
                      />
                      <span>{t.name}</span>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            <div className={S.articlesSection}>
              <h3>{articlesTitle}</h3>
              <div className={S.articlesContainer}>
                <div style={{position: 'relative'}}>
                  <AnimatePresence>
                    <motion.div
                      key={selectedIndex}
                      transition={{duration: 0.2}}
                      initial={{y: -5, opacity: 0}}
                      animate={{y: 0, opacity: 1}}
                      exit={{y: 5, opacity: 0}}
                    >
                      <a
                        href={articles[selectedIndex].url}
                        target='_blank'
                        referrerPolicy='no-referrer'
                      >
                        {articles[selectedIndex].title}
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button onClick={nextIndex}>
                  <Chevron />
                </button>
              </div>
            </div>
          </div>
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

const asdd = when(123 > 5)
  .return(123)
  .else(234);

export default TechsAndInfo;

const techTitleFormatter = (title: string) => title.replaceAll(/([a-z])([A-Z])/g, '$1-$2');
