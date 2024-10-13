import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
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

  useEffect(() => {
    setEng(localStorage.getItem('isEng') === 'false');
  }, []);

  useEffect(() => {
    if (eng === null) return;
    document.documentElement.lang = eng ? 'en' : 'es';
    localStorage.setItem('isEng', `${eng}`);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', document.documentElement.lang);
    window.history.pushState(null, '', url.toString());
  }, [eng]);

  const contextValue = useMemo<LanguageProps>(() => ({setEng, eng}), [eng]);
  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
