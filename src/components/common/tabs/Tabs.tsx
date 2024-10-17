import {TechType} from '@constants';
import useEventListener from '@hooks/useEventListener';
import {useEffect, useRef, useState} from 'react';
import S from './Tabs.module.css';

interface TabsProps {
  tabs: [TechType, string][];
  onChange: (selectedTab: TechType) => void | undefined;
}

const Tabs: React.FC<TabsProps> = ({tabs, onChange}) => {
  const [selectedTab, setSelectedTab] = useState(
    typeof tabs[0] === 'string' ? tabs[0] : tabs[0][0],
  );
  const [[start, end], setRange] = useState([0, 0]);

  const selectedTabRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setRangeValues = () => {
    const selectedTabXStart =
      selectedTabRef.current!.getBoundingClientRect().left -
      containerRef.current!.getBoundingClientRect().left;
    const selectedTabXEnd =
      selectedTabXStart + selectedTabRef.current!.getBoundingClientRect().width;
    setRange([selectedTabXStart, selectedTabXEnd]);
  };

  useEventListener({event: 'scroll', fn: setRangeValues, element: containerRef.current as Node});
  useEventListener({event: 'touchmove', fn: setRangeValues, element: containerRef.current as Node});

  useEffect(() => {
    setRangeValues();
  }, [selectedTab]);

  const onChangeHandler = (selectedTab: TechType) => {
    setSelectedTab(selectedTab);
    onChange(selectedTab);
  };

  return (
    <div
      ref={containerRef}
      className={S.tabs}
      style={{
        backgroundSize: `${end - start}px 1.2em`,
        backgroundPositionX: `${start}px`,
      }}
    >
      {tabs.map(([type, name]) => (
        <button
          ref={selectedTab === type ? selectedTabRef : undefined}
          onClick={() => onChangeHandler(type)}
          className={selectedTab === type ? S.selectedTab : ''}
          key={type}
          type='button'
        >
          {name}
        </button>
      ))}
    </div>
  );
};
export default Tabs;
