import React from 'react';
import styles from './NavBar.module.css';
type ElasticDropdownProps = {
  options: string[];
  action: (index: number) => void;
  selectedIndex: number;
  background?: string;
};
const ElasticDropdown: React.FC<ElasticDropdownProps> = ({options, selectedIndex, action}) => (
  <div className={styles.options}>
    <span>See more</span>
    {options.map((sn, i) => (
      <span key={sn} onClick={() => action(i)} className={selectedIndex === i ? styles.clickedOption : undefined}>
        {sn}
      </span>
    ))}
  </div>
);

export default ElasticDropdown;
