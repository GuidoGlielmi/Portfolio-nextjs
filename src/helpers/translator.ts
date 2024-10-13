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
  Certificate: 'Certificado',
  "I've written some articles in Medium™": 'Algunos articulos que he escrito en Medium™',
};

export type TranslationKeys = keyof typeof translationsKeys;

export const translate = (str: TranslationKeys, eng: boolean | null = true) => {
  const translation = translationsKeys[str];
  return eng || !translation ? str : translationsKeys[str];
};
