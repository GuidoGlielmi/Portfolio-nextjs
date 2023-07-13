import {useState, useRef, useEffect} from 'react';
import S from './Tabs.module.css';

interface TabsProps {
  tabs: string[] | [string, string][];
  onChange: (selectedTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({tabs, onChange}) => {
  const [selectedTab, setSelectedTab] = useState(
    typeof tabs[0] === 'string' ? tabs[0] : tabs[0][0],
  );
  const [[start, end], setRange] = useState([0, 0]);

  const selectedTabRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setRangeValues = () => {
    const start =
      selectedTabRef.current!.getBoundingClientRect().left -
      containerRef.current!.getBoundingClientRect().left;
    const end = start + selectedTabRef.current!.getBoundingClientRect().width;
    setRange([start, end]);
  };

  useEffect(() => {
    containerRef.current!.addEventListener('scroll', setRangeValues);
    return () => containerRef.current!.addEventListener('scroll', setRangeValues);
  }, []);

  useEffect(() => {
    setRangeValues();
  }, [selectedTab]);

  const onChangeHandler = (selectedTab: string) => {
    setSelectedTab(selectedTab);
    onChange(selectedTab);
  };

  return (
    <div
      onScroll={e => {
        console.log(e);
      }}
      ref={containerRef}
      className={S.tabs}
      style={{
        backgroundSize: `${end - start}px 1.2em`,
        backgroundPositionX: `${start}px`,
      }}
    >
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
              ref={selectedTab === t[0] ? selectedTabRef : undefined}
              onClick={() => onChangeHandler(t[0])}
              className={selectedTab === t[0] ? S.selectedTab : ''}
              key={t[0]}
            >
              {t[1]}
            </p>
          ))}
    </div>
  );
};
export default Tabs;
// background: `linear-gradient(to right, black ${start}px, #ffffff ${start}px, #ffffff ${end}px, black ${end}px, black) text`,
