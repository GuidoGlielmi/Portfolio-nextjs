import {useEffect, useState} from 'react';

const useBreakpoint = (breakpoint = 768, delay = 75) => {
  const [bigger, setBigger] = useState(true);
  useEffect(() => {
    const resize = debounce(() => {
      setBigger(window.innerWidth > breakpoint);
    }, delay);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [breakpoint, delay]);
  return bigger;
};

function debounce(fn: (...args: any[]) => void, delay: number) {
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
