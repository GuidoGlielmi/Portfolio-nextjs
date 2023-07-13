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
  techs: string[];
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
  name: string;
  image: string;
  type: string;
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
