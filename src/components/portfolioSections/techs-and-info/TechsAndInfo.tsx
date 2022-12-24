import ElasticDropdown from 'components/common/dropdowns/ElasticDropdown';
import {ITechnology, IUser} from 'IPortfolio';
import Techs from './Techs';
import S from './TechsAndInfo.module.css';
import * as Icons from 'components/common/icons/techs';

type TechsAndInfoProps = {
  techs?: ITechnology[];
  user?: IUser;
};
const size = '35px';
const getOptions = (element: React.FC<Icons.TechIconProps>) => (
  <>
    <>{element({size})}</>
    <span>{element.displayName}</span>
  </>
);
const TechsAndInfo: React.FC<TechsAndInfoProps> = ({techs, user}) => {
  if (!techs || !user) return null;
  const backEndTechs = [
    Icons.CSharpIcon,
    Icons.ExpressJsIcon,
    Icons.GraphQLIcon,
    Icons.HibernateIcon,
    Icons.JavaIcon,
    Icons.NetIcon,
    Icons.NodeJsIcon,
    Icons.SpringIcon,
  ];
  const frontEndTechs = [
    Icons.CssIcon,
    Icons.HtmlIcon,
    Icons.JavascriptIcon,
    Icons.NextJsIcon,
    Icons.ReduxIcon,
    Icons.TypescriptIcon,
    Icons.AspNetIcon,
  ];
  const databases = [Icons.MongoIcon, Icons.PostgreIcon];
  const ORMs = [Icons.HibernateIcon, Icons.PrismaIcon, Icons.SequelizeIcon];

  const frontOptions = frontEndTechs.map(i => getOptions(i));
  const backOptions = backEndTechs.map(i => getOptions(i));
  const databasesOptions = databases.map(i => getOptions(i));
  const ormsOptions = ORMs.map(i => getOptions(i));
  return (
    <section className={S.techsAndInfoSection}>
      <div className={S.techsContainer}>
        <ElasticDropdown options={frontOptions} selectedIndex={0} title='Front-end' />
        <ElasticDropdown options={backOptions} selectedIndex={0} title='Back-end' />
        <ElasticDropdown options={databasesOptions} selectedIndex={0} title='Databases' />
        <ElasticDropdown options={ormsOptions} selectedIndex={0} title="ORM's" />
      </div>
      {/* <Techs techs={techs} /> */}
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
