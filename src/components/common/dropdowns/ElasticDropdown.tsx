import React, {useState} from 'react';
import styles from './styles.module.css';
type ElasticDropdownProps = {
  title: string;
  options: any[];
  action?: (index: number) => void;
  selectedIndex?: number;
  background?: string;
  key?: React.Key;
};

const HEIGHT = 7;
const PADDING = 2;
const ElasticDropdown: React.FC<ElasticDropdownProps> = ({
  title,
  options,
  selectedIndex,
  action,
  background = '#222',
  key,
}) => {
  if (!/^#\d{3,}$/g.test(background)) background = '#333';

  const [hovered, setHovered] = useState(false);
  return (
    <div
      key={key}
      className={styles.options}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: hovered
          ? `calc(${options.length * HEIGHT + PADDING * 2}vh + ${10 * options.length - 1}px)`
          : `${HEIGHT + PADDING}vh`,
        padding: `${PADDING}vh 0`,
        background: getGradient(background),
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

const getFullColor = (color: string) =>
  color.length === 4 ? `#${color.slice(1).replaceAll(/(\d)/g, (_e, e) => `${e}0`)}` : color;
const getLightenedColor = (color: string) => `${color}dd`;
const getGradient = (color: string) => {
  const fullColor = getFullColor(color);
  return `linear-gradient(to bottom right, ${getLightenedColor(fullColor)}, ${fullColor})`;
};
