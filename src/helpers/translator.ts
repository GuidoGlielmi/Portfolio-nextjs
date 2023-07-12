const translationsKeys = {
  'Who am I': 'Sobre mí',
  'Projects & Experiences': 'Proyectos & Experiencias',
  'People Skills': 'Habilidades Blandas',
  Languages: 'Idiomas',
  'A little something about me': 'Un poco sobre mí...',
  "Technologies I'm familiar with": 'Tecnologías con las que estoy familiarizado',
  Experiences: 'Experiencias',
  Projects: 'Proyectos',
  Current: 'En Curso',
};

export type TranslationKeys = keyof typeof translationsKeys;

export const translate = (str: TranslationKeys, eng: boolean = true) => {
  const translation = translationsKeys[str];
  if (!translation) return eng ? `'Missing Translation` : '`Traducción Faltante`';
  return eng ? str : translationsKeys[str] || '`Traducción Faltante`';
};
