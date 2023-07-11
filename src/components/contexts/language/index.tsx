import {
  createContext,
  useMemo,
  useState,
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import {translate} from '../../../../translator';

interface LanguageProps {
  setEng: Dispatch<SetStateAction<boolean>>;
  eng: boolean;
  getTranslatedString: (str: string) => string | undefined;
}

export const LanguageContext = createContext<LanguageProps | null>(null);

const LanguageProvider: FC<PropsWithChildren<LanguageProps>> = ({children}) => {
  const [eng, setEng] = useState(true);

  const getTranslatedString = (str: string) => (eng ? str : translate(str));

  const contextValue = useMemo(
    () => ({
      getTranslatedString,
      setEng,
      eng,
    }),
    [eng],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
