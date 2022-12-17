import styles from './NavBar.module.css';
import {IUser} from 'IPortfolio';

type NavBarProps = {
  user?: IUser;
};

const NavBar: React.FC<NavBarProps> = ({user}) => {
  return (
    <>
      <DesktopNavBar user={user} />
    </>
  );
};

const DesktopNavBar: React.FC<NavBarProps> = ({user}) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.social}>
        <a href={user?.linkedInUrl} target='_blank' rel='noreferrer'>
          <img src='./assets/logos/GitHub-Mark-64px.png' alt='LinkedIn external link' />
        </a>
        <a href={user?.githubUrl} target='_blank' rel='noreferrer'>
          <img src='./assets/logos/linkedin.png' alt='Github external link' />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
