import React from 'react';
import useOnScroll from './useOnScroll';

const usePaintOnStickyElementScroll = (
  background: string,
  color: string,
  element: React.RefObject<HTMLDivElement>,
  container: React.RefObject<HTMLDivElement>,
) => {
  useOnScroll(() => {
    if (element.current!.offsetTop > container.current!.offsetTop) {
      element.current!.style.background = background;
      element.current!.style.color = color;
    } else {
      element.current!.style.background = 'transparent';
      element.current!.style.color = '';
    }
  });
};

export default usePaintOnStickyElementScroll;
