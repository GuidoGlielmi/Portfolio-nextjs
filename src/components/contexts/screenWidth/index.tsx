import useEventListener from '@hooks/useEventListener';
import {debounce} from 'helpers/debounce';
import {createContext, FC, PropsWithChildren, useState} from 'react';

type ScreenWidthProviderProps = {children: React.ReactNode};

export const ScreenWidthContext = createContext<number>(1024);

const ScreenWidthProvider: FC<PropsWithChildren<ScreenWidthProviderProps>> = ({children}) => {
  const [ScreenWidth, setScreenWidth] = useState(1024);

  const resize = debounce(() => setScreenWidth(window.innerWidth), 50);
  useEventListener('resize', resize, true);

  return <ScreenWidthContext.Provider value={ScreenWidth}>{children}</ScreenWidthContext.Provider>;
};

export default ScreenWidthProvider;
