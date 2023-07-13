import {
  createContext,
  useMemo,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';

export interface LanguageProps {
  setEng: Dispatch<SetStateAction<boolean | null>>;
  eng: boolean | null;
}

type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageContext = createContext<LanguageProps | null>(null);

const LanguageProvider: FC<PropsWithChildren<LanguageProviderProps>> = ({children}) => {
  const [eng, setEng] = useState<boolean | null>(null);

  const contextValue = useMemo<LanguageProps>(() => ({setEng, eng}), [eng]);

  useEffect(() => {
    const isEng = localStorage.getItem('isEng');
    // console.log(isEng, 'false');
    if (isEng === 'false') setEng(false);
    else setEng(true);
  }, []);

  useEffect(() => {
    if (eng === null) return;
    localStorage.setItem('isEng', `${eng}`);
  }, [eng]);

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
