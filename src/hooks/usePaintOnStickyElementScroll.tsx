import React from 'react';
import useEventListener from './useEventListener';

const usePaintOnStickyElementScroll = (
  background: string,
  color: string,
  element: React.RefObject<HTMLDivElement>,
  container: React.RefObject<HTMLDivElement>,
) => {
  useEventListener(
    'scroll',
    () => {
      if (element.current!.offsetTop > container.current!.offsetTop) {
        element.current!.style.background = background;
        element.current!.style.color = color;
      } else {
        element.current!.style.background = 'transparent';
        element.current!.style.color = '';
      }
    },
    true,
  );
};

export default usePaintOnStickyElementScroll;
