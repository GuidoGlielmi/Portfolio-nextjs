export interface Es<obj> {
  es: obj;
}

interface IProjectSpanish {
  description: string;
}

interface ISkillSpanish {
  name: string;
}

interface IUserSpanish {
  aboutMe: string;
}

export type Date = `${DateUnit}/${DateUnit}`;
export type EndDate = 'Current' | Date;
type DateUnit = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

export interface IExperience extends IProject {
  startDate: Date;
  endDate: EndDate;
}

export interface IProject extends Es<IProjectSpanish> {
  certificate: string | undefined;
  deployUrl: string;
  deployVideo: string;
  image: string;
  title: string;
  description: string;
  urls: IProjectUrl[];
  techs: Tech[];
}

export enum Tech {
  ANGULAR = 'Angular',
  ASP_NET = 'ASP.NET',
  CSS3 = 'CSS3',
  C_SHARP = 'C#',
  ENTITY_FRAMEWORK = 'Entity Framework',
  EXPRESS = 'Express.js',
  FRAMER_MOTION = 'Framer Motion',
  GRAPH_QL = 'GraphQL',
  HTML5 = 'HTML5',
  JAVA = 'Java',
  JAVASCRIPT = 'Javascript',
  NEXT = 'Next.js',
  NEST = 'Nest.js',
  NODE = 'Node.js',
  MATERIAL_UI = 'MaterialUI',
  MONGODB = 'MongoDB',
  POSTGRE_SQL = 'PostgreSQL',
  PRISMA = 'Prisma',
  REACT = 'React',
  REDUX = 'Redux',
  SPRING_BOOT = 'Spring Boot',
  SPRING = 'Spring',
  SEQUELIZE = 'Sequelize',
  TYPESCRIPT = 'Typescript',
}

export enum SkillType {
  LANGUAGE,
  HARD_AND_SOFT,
}

export interface ISkill extends Es<ISkillSpanish> {
  // abilityPercentage: string;
  name: string;
  type: string;
}

export interface ITechnology {
  name: Tech;
  image: string;
  type: TechType;
}

export enum TechType {
  FRONT_END = 'FrontEnd',
  BACK_END = 'BackEnd',
  DATABASE = 'Database',
  ORM = 'ORM',
}

export interface IUser extends Es<IUserSpanish> {
  aboutMe: string;
  firstName: string;
  githubUrl: string;
  lastName: string;
  linkedInUrl: string;
  image: string;
  username: string;
  fullName: string;
}

export interface IProjectUrl {
  url: string;
  name: string;
}
