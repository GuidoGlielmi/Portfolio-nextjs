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

export interface IExperience extends IProject {
  certificate: string | undefined;
  startDate: string;
  endDate: string;
}

export interface IProject extends Es<IProjectSpanish> {
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
