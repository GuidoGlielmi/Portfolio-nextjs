import {ScreenWidthContext} from 'components/contexts/screenWidth';
import {useContext, useEffect, useState} from 'react';

/**
 * Returns a boolean indicating if the screen width is bigger than the specified threshold
 */
const useBreakpoint = (breakpoint = 768) => {
  const screenWidth = useContext(ScreenWidthContext);

  const [bigger, setBigger] = useState(true);

  useEffect(() => {
    setBigger(screenWidth > breakpoint);
  }, [screenWidth]);

  return bigger;
};

export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function throttle(fn: (...args: any[]) => void, delay = 150) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    if (timer !== undefined) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };
}

export default useBreakpoint;
