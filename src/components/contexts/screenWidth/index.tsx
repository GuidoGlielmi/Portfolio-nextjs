import {debounce} from 'helpers/debounce';
import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';

type ScreenWidthProviderProps = {children: React.ReactNode};

export const ScreenWidthContext = createContext<number>(1024);

const ScreenWidthProvider: FC<PropsWithChildren<ScreenWidthProviderProps>> = ({children}) => {
  const [ScreenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    const resize = debounce(() => setScreenWidth(window.innerWidth), 50);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <ScreenWidthContext.Provider value={ScreenWidth}>{children}</ScreenWidthContext.Provider>;
};

export default ScreenWidthProvider;
