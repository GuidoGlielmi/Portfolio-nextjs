import styles from './NavBar.module.css';
import {IUser} from 'IPortfolio';

const sectionsNames = ['Who am I', 'Projects', 'Experiences', 'My education', 'My skills'];

type NavBarProps = {
  user?: IUser;
  sectionIndex: number;
  triggerAnimation: (i: number) => void;
};

const NavBar: React.FC<NavBarProps> = ({user, sectionIndex, triggerAnimation}) => {
  return (
    <>
      <SectionLinks sectionIndex={sectionIndex} triggerAnimation={triggerAnimation} />
      <div className={styles.social}>
        <a href={user?.linkedInUrl} target='_blank' rel='noreferrer'>
          <img src='./assets/logos/GitHub-Mark-64px.png' alt='LinkedIn external link' />
        </a>
        <a href={user?.githubUrl} target='_blank' rel='noreferrer'>
          <img src='./assets/logos/linkedin.png' alt='Github external link' />
        </a>
      </div>
    </>
  );
};

interface SectionLinksProps {
  sectionIndex: number;
  triggerAnimation: (i: number) => void;
}

const SectionLinks: React.FC<SectionLinksProps> = ({sectionIndex, triggerAnimation}) => (
  <div className={styles.sectionLinks}>
    <span>See more</span>
    {sectionsNames.map((sn, i) => (
      <span
        key={sn}
        onClick={() => triggerAnimation(i)}
        className={sectionIndex === i ? styles.clickedSectionLink : undefined}
      >
        {sn}
      </span>
    ))}
  </div>
);

export default NavBar;
