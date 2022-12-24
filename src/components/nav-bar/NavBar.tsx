import styles from './NavBar.module.css';
import {IUser} from 'IPortfolio';
import Ar from 'components/common/icons/flags/Ar';
import Eu from 'components/common/icons/flags/Us';
import {useEffect, useState} from 'react';
import GithubIcon from 'components/common/icons/social/GithubIcon';
import LinkedinIcon from 'components/common/icons/social/LinkedinIcon';

const sectionsNames = ['Who am I', 'Projects', 'Experiences', 'My education', 'My skills'];

type NavBarProps = {
  user?: IUser;
  sectionIndex: number;
  setSectionIndex: (i: number) => void;
};

const NavBar: React.FC<NavBarProps> = ({user, sectionIndex, setSectionIndex}) => {
  const [selectedLangIndex, setSelectedLangIndex] = useState(0);
  const [langsHovered, setLangsHovered] = useState(false);
  const [cvHovered, setCvHovered] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(pp => pp + (selectedLangIndex ? -100 : 100));
  }, [selectedLangIndex]);

  useEffect(() => {
    setPosition(pp => (pp === 100 ? pp - 100 : pp + 100));
  }, [langsHovered]);

  return (
    <nav className={styles.nav}>
      <SectionLinks sectionIndex={sectionIndex} setSectionIndex={setSectionIndex} />
      <div className={styles.social}>
        <div
          className={styles.languages}
          onMouseEnter={() => setLangsHovered(true)}
          onMouseLeave={() => setLangsHovered(false)}
        >
          <div style={{right: `${position}%`}} onClick={() => setSelectedLangIndex(0)}>
            <Ar size='100%' round />
          </div>
          <div style={{right: `${position}%`}} onClick={() => setSelectedLangIndex(1)}>
            <Eu size='100%' round />
          </div>
        </div>
        <div className={styles.cvSection} onMouseEnter={() => setCvHovered(true)}>
          <h3>CV</h3>
          {cvHovered && (
            <div onMouseLeave={() => setCvHovered(false)} className={styles.cvContainer}>
              <a href='assets/Guido-Glielmi-RESUME.pdf' download>
                EN
              </a>
              <a href='assets/Guido-Glielmi-RESUME(es).pdf' download>
                ES
              </a>
            </div>
          )}
        </div>
        <a href={user?.linkedInUrl} target='_blank' rel='noreferrer'>
          <GithubIcon />
          {/* <img src='./assets/logos/GitHub-Mark-64px.png' alt='LinkedIn external link' /> */}
        </a>
        <a href={user?.githubUrl} target='_blank' rel='noreferrer'>
          <LinkedinIcon />
          {/* <img src='./assets/logos/linkedin.png' alt='Github external link' /> */}
        </a>
      </div>
    </nav>
  );
};

interface SectionLinksProps {
  sectionIndex: number;
  setSectionIndex: (i: number) => void;
}

const SectionLinks: React.FC<SectionLinksProps> = ({sectionIndex, setSectionIndex}) => (
  <div className={styles.sectionLinks}>
    <span>See more</span>
    {sectionsNames.map((sn, i) => (
      <span
        key={sn}
        onClick={() => setSectionIndex(i)}
        className={sectionIndex === i ? styles.clickedSectionLink : undefined}
      >
        {sn}
      </span>
    ))}
  </div>
);

export default NavBar;
