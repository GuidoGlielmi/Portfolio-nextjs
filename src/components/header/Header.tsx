import styles from './Header.module.css';
import {IUser} from 'IPortfolio';
type HeaderProps = {
  user?: IUser;
};
const Header: React.FC<HeaderProps> = ({user}) => {
  if (!user) return null;
  return (
    <>
      <div className={styles.headerShadowContainer}>
        <div className={styles.headerShadow} />
      </div>
      <header className={styles.header}>
        <div className={styles.infoAndTitle}>
          <div className={styles.infoContainer}>
            <h3>Welcome to my personal page!</h3>
            <div>
              <div className={styles.profileImgContainer}>
                <>
                  <img src={user.profileImg} alt='profile' />
                  <h1>{`${user.firstName} ${user.lastName}`}</h1>
                </>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
