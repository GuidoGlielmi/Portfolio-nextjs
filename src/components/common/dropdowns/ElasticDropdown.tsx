import React, {useState} from 'react';
import styles from './styles.module.css';
type ElasticDropdownProps = {
  title: string;
  options: any[];
  action?: (index: number) => void;
  selectedIndex: number;
  background?: string;
};
const ElasticDropdown: React.FC<ElasticDropdownProps> = ({title, options, selectedIndex, action}) => {
  const [hovered, setHovered] = useState(false);
  const height = 7;
  return (
    <div
      className={styles.options}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{height: hovered ? `${options.length * height}vh` : `${height}vh`}}
    >
      <span>{title}</span>
      {options.map((sn, i) => (
        <div
          key={sn}
          onClick={() => action?.(i)}
          className={action && selectedIndex === i ? styles.clickedOption : undefined}
        >
          {sn}
        </div>
      ))}
    </div>
  );
};
export default ElasticDropdown;
