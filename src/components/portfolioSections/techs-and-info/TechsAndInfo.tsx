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
