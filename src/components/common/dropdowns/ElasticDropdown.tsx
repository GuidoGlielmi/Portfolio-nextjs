import React, {useState} from 'react';
import styles from './styles.module.css';
type ElasticDropdownProps = {
  title: string;
  options: any[];
  action?: (index: number) => void;
  selectedIndex?: number;
  background?: string;
};
const getFullColor = (color: string) => `#${color.slice(1).replaceAll(/(\d)/g, (_e, e) => `${e}0`)}`;
const HEIGHT = 7;
const PADDING = 2;
const ElasticDropdown: React.FC<ElasticDropdownProps> = ({
  title,
  options,
  selectedIndex,
  action,
  background = '#444',
}) => {
  if (!/^#\d{3,}$/g.test(background)) throw new Error('Bad color');

  const [hovered, setHovered] = useState(false);
  const backgroundFormatted = `${background.length === 4 ? getFullColor(background) : background}22`;
  return (
    <div
      className={styles.options}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: hovered
          ? `calc(${options.length * HEIGHT + PADDING * 2}vh + ${10 * options.length - 1}px)`
          : `${HEIGHT + PADDING}vh`,
        padding: `${PADDING}vh 0`,
        background: `linear-gradient(to bottom right, ${backgroundFormatted}, ${backgroundFormatted})`,
      }}
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
