import HorizontallyScrollable from '../enhancers/HorizontallyScrolleable';
import {useState} from 'react';
import S from './Tabs.module.css';

interface TabsProps {
  tabs: string[] | [string, string][];
  onChange: (selectedTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({tabs, onChange}) => {
  const [selectedTab, setSelectedTab] = useState(
    typeof tabs[0] === 'string' ? tabs[0] : tabs[0][0],
  );
  const onChangeHandler = (selectedTab: string) => {
    setSelectedTab(selectedTab);
    onChange(selectedTab);
  };
  return (
    <HorizontallyScrollable>
      <div className={S.tabs}>
        {typeof tabs[0] === 'string'
          ? (tabs as string[]).map(t => (
              <p
                onClick={() => onChangeHandler(t)}
                className={selectedTab === t ? S.selectedTab : ''}
                key={t}
              >
                {t}
              </p>
            ))
          : (tabs as [string, string][]).map(t => (
              <p
                onClick={() => onChangeHandler(t[0])}
                className={selectedTab === t[0] ? S.selectedTab : ''}
                key={t[0]}
              >
                {t[1]}
              </p>
            ))}
      </div>
    </HorizontallyScrollable>
  );
};
export default Tabs;
