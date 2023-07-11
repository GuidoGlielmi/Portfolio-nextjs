import {useContext} from 'react';
import {Language, languageContext} from '../../pages';

export enum translationsKeys {
  whoAmI = 'whoAmI',
  whoAmITitle = 'whoAmITitle',
  projectsAndExperiences = 'projectsAndExperiences',
  techsTitle = 'techsTitle',
  experiences = 'experiences',
  projects = 'projects',
  peopleSkills = 'peopleSkills',
  languages = 'languages',
}

const translations = {
  whoAmI: {en: 'Who Am I', es: 'Sobre mí'},
  whoAmITitle: {en: 'A little something about me', es: 'Un poco sobre mí...'},
  projectsAndExperiences: {en: 'Projects & Experiences', es: 'Projectos & Experiencias'},
  techsTitle: {
    en: "Technologies I'm familiar with",
    es: 'Tecnologías con las que estoy familiarizado',
  },
  experiences: {
    en: 'Experiences',
    es: 'Experiencias',
  },
  projects: {
    en: 'Projects',
    es: 'Projectos',
  },
  peopleSkills: {
    en: 'People Skills',
    es: 'Habilidades Blandas',
  },
  languages: {
    en: 'Languages',
    es: 'Idiomas',
  },
};

const useTranslation = (key: translationsKeys) => {
  const selectedLang = useContext(languageContext);
  return (
    (translations as any)[key][selectedLang === Language.en ? 'en' : 'es'] ||
    '`Missing Translation`'
  );
};

export default useTranslation;
