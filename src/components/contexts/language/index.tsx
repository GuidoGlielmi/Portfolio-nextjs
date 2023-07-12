import {
  createContext,
  useMemo,
  useState,
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';

export interface LanguageProps {
  setEng: Dispatch<SetStateAction<boolean>>;
  eng: boolean;
}

type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageContext = createContext<LanguageProps | null>(null);

const LanguageProvider: FC<PropsWithChildren<LanguageProviderProps>> = ({children}) => {
  const [eng, setEng] = useState(true);

  const contextValue = useMemo<LanguageProps>(() => ({setEng, eng}), [eng]);

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
