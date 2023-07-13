import S from './NavBar.module.css';
import {IUser} from 'IPortfolio';
import Ar from 'components/common/icons/flags/Ar';
import Eu from 'components/common/icons/flags/Us';
import {useEffect, useState, useContext, useRef} from 'react';
import GithubIcon from 'components/common/icons/social/GithubIcon';
import LinkedinIcon from 'components/common/icons/social/LinkedinIcon';
import {debounce} from 'helpers/debounce';
import {LanguageContext, LanguageProps} from 'components/contexts/language';
import EmailIcon from '../../../public/icons/emailIcon';

type NavBarProps = {
  user: IUser;
  refs: {ref: React.RefObject<HTMLDivElement>; title: string}[];
};

const NavBar: React.FC<NavBarProps> = ({user, refs}) => {
  const {eng, setEng} = useContext(LanguageContext) as LanguageProps;
  const [cvHovered, setCvHovered] = useState(false);
  const [position, setPosition] = useState(0);
  const [selectedSection, setSelectedSection] = useState(0);
  const [langsHovered, setLangsHovered] = useState<boolean>(false);

  const previousEng = useRef(eng);

  useEffect(() => {
    const checkSelectedSection = () => {
      setSelectedSection(Number(window.scrollY >= (refs[0].ref.current?.clientHeight || 0)));
    };

    document.addEventListener('scroll', debounce(checkSelectedSection, 100));
    return () => removeEventListener('scroll', checkSelectedSection);
  }, []);

  useEffect(() => {
    if (langsHovered === null) return;
    const invertFlagPosition = () => setPosition(pp => (pp === 100 ? pp - 100 : pp + 100));
    if (langsHovered) {
      invertFlagPosition();
      previousEng.current = eng;
    } else if (eng !== null && previousEng.current === eng) invertFlagPosition();
  }, [langsHovered]);

  useEffect(() => {
    if (eng !== null && previousEng.current === null) {
      if (!eng) setPosition(pp => (pp === 100 ? pp - 100 : pp + 100));
    }
  }, [eng]);

  return (
    <nav className={S.nav}>
      <div className={S.sectionsNames}>
        {refs.map(({ref, title}, i) => (
          <p
            className={selectedSection === i ? S.selectedSectionName : ''}
            onClick={() => {
              ref.current?.scrollIntoView({behavior: 'smooth'});
            }}
            key={title}
          >
            {title}
          </p>
        ))}
      </div>
      <div className={S.social}>
        <div
          className={S.languages}
          onMouseEnter={() => setLangsHovered(true)}
          onMouseLeave={() => setLangsHovered(false)}
        >
          <button style={{right: `${position}%`}} onClick={() => setEng(true)}>
            <Eu size='100%' round />
          </button>
          <button style={{right: `${position}%`}} onClick={() => setEng(false)}>
            <Ar size='100%' round />
          </button>
        </div>
        <div className={S.cvSection} onMouseEnter={() => setCvHovered(true)}>
          <h3>CV</h3>
          <div
            style={{pointerEvents: cvHovered ? 'all' : 'none'}}
            onMouseLeave={() => setCvHovered(false)}
          >
            <a href='assets/Guido-Glielmi-RESUME.pdf' download>
              EN
            </a>
            <a href='assets/Guido-Glielmi-RESUME(es).pdf' download>
              ES
            </a>
          </div>
        </div>
        <a href='mailto:guidoglielmi@gmail.com' target='_blank' rel='noreferrer'>
          <EmailIcon />
        </a>
        <a href={user?.linkedInUrl} target='_blank' rel='noreferrer'>
          <LinkedinIcon />
        </a>
        <a href={user?.githubUrl} target='_blank' rel='noreferrer'>
          <GithubIcon />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
