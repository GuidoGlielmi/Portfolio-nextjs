import React, {useRef} from 'react';

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
    <div
      ref={containerRef}
      style={{
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        scrollBehavior: 'smooth',
      }}
      onWheel={handleWheel}
    >
      {children}
    </div>
  );
};

export default HorizontallyScrollable;
