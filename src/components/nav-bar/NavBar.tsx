import GithubIcon from 'components/common/icons/social/GithubIcon';
import LinkedinIcon from 'components/common/icons/social/LinkedinIcon';
import {IUser} from 'IPortfolio';
import EmailIcon from '../../../public/icons/emailIcon';
import S from './NavBar.module.css';
import Navigation from './navigation';
import CvSection from './social/cvSection';
import Languages from './social/languages';

type NavBarProps = {
  user: IUser;
  refs: {ref: React.RefObject<HTMLDivElement>; title: string}[];
};

const NavBar: React.FC<NavBarProps> = ({user, refs}) => {
  return (
    <nav className={S.nav}>
      <Navigation refs={refs} />
      <div className={S.social}>
        <Languages />
        <CvSection />
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
