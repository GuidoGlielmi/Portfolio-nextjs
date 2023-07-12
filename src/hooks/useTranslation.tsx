import {LanguageContext, LanguageProps} from 'components/contexts/language';
import {useContext} from 'react';
import {translate, TranslationKeys} from '../helpers/translator';

const useTranslation = (key: TranslationKeys | TranslationKeys[]) => {
  const {eng} = useContext(LanguageContext) as LanguageProps;
  const keys = key instanceof Array ? key : [key];
  return keys.map(k => translate(k, eng));
};

export default useTranslation;
