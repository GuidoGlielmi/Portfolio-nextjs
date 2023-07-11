export interface IExperience extends IProject {
  certificate: string;
  startDate: string;
  endDate: string;
}

export interface IProject {
  deployUrl: string;
  description: string;
  image: string;
  title: string;
  urls: IProjectUrl[];
  techs: string[];
}

export enum SkillType {
  LANGUAGE,
  HARD_AND_SOFT,
}

export interface ISkill {
  abilityPercentage: string;
  name: string;
  type: string;
}

export interface ITechnology {
  name: string;
  image: string;
  type: string;
}

export interface IUser {
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
