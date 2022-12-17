import {ITechnology, IUser} from 'IPortfolio';
import Techs from './Techs';
import styles from './TechsAndInfo.module.css';

type TechsAndInfoProps = {
  techs?: ITechnology[];
  user?: IUser;
};

const TechsAndInfo: React.FC<TechsAndInfoProps> = ({techs, user}) => {
  if (!techs || !user) return null;
  return (
    <section className={styles.techsAndInfoSection}>
      <div className={styles.personalInfo}>
        <h2>I&apos;m a web developer</h2>
        {<p>{user.aboutMe}</p>}
        <a href='./assets/Guido-Glielmi-RESUME.pdf' download>
          Download my CV
        </a>
        <a href='./assets/Guido-Glielmi-RESUME(es).pdf' download>
          Download my CV (es)
        </a>
      </div>
      <Techs techs={techs} />
    </section>
  );
};

export const when = (condition: boolean, value: any) => ({
  elseWhen: (newCondition: boolean) => when(condition || newCondition, value),
  return: (v: any) => when(condition, condition === true ? value ?? v : null),
  else: (v: any) => value ?? v,
  get: value,
});

export default TechsAndInfo;
