import React, {useRef} from 'react';
import S from './HorizontallyScrolleable.module.css';
interface HorizontallyScrollableProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const HorizontallyScrollable: React.FC<HorizontallyScrollableProps> = ({children}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    containerRef.current!.scrollLeft += e.deltaY;
  };

  return (
    <div className={S.container} ref={containerRef} onWheel={handleWheel}>
      {children}
    </div>
  );
};

export default HorizontallyScrollable;
