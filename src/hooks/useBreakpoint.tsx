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

export default useBreakpoint;
