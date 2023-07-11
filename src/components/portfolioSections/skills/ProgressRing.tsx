import {useState, useEffect} from 'react';
import styles from './ProgressRing.module.css';

type ProgressRingProps = {
  percentage?: string;
};

export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

const ProgressRing: React.FC<ProgressRingProps> = ({percentage = '100'}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const sizeMultiplier = screenWidth > 650 ? 1 : 3;
  const radius = 2.5 * sizeMultiplier;
  const strokeWidth = radius / 3;
  const diameter = radius * 2 + strokeWidth;
  const circumference = screenWidth * (radius / 100) * 2 * Math.PI;
  const offset = (circumference * (100 - parseInt(percentage))) / 100;
  const cxy = radius + strokeWidth / 2;
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = debounce(() => setScreenWidth(window.innerWidth), 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.circleBox}>
      <p>{percentage}%</p>
      <svg width={`${diameter}vw`} height={`${diameter}vw`}>
        <circle
          className={styles.grayCircle}
          strokeWidth={`${strokeWidth}vw`}
          fill='transparent'
          r={`${radius}vw`}
          cx={`${cxy}vw`}
          cy={`${cxy}vw`}
        />
        <circle
          className={styles.circle}
          strokeWidth={`${strokeWidth}vw`}
          fill='transparent'
          r={`${radius}vw`}
          cx={`${cxy}vw`}
          cy={`${cxy}vw`}
          strokeDasharray={`${circumference}px`}
          strokeDashoffset={`${offset}px`}
        />
      </svg>
    </div>
  );
};
export default ProgressRing;
