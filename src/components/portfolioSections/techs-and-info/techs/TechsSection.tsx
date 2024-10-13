import {TechType} from '@constants';
import Tabs from 'components/common/tabs/Tabs';
import useTranslation from 'hooks/useTranslation';
import {useState} from 'react';
import Articles from './articles';
import TechGroup from './techGroup';
import S from './TechsSection.module.css';

type TechsSectionProps = {
  techs: [type: TechType[], tech: ITechnology[]];
  user: IUser;
};

const TechsSection = ({techs: [types, techs], user}: TechsSectionProps) => {
  const [techsTitle] = useTranslation(["Technologies I'm familiar with"]);

  const [selectedTechType, setSelectedTechType] = useState(types[0]);

  return (
    <div className={S.techsSection}>
      <h2>{techsTitle}</h2>
      <div className={S.techsContainer}>
        <Tabs
          tabs={types.map<[TechType, string]>(t => [t, techTitleFormatter(t)])}
          onChange={selectedTab => {
            setSelectedTechType(selectedTab);
          }}
        />
        <TechGroup techs={techs.filter(t => t.type === selectedTechType)} />
        <Articles user={user} />
      </div>
    </div>
  );
};

export default TechsSection;

const techTitleFormatter = (title: string) => title.replaceAll(/([a-z])([A-Z])/g, '$1-$2');
