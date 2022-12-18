export interface IEducation {
  id: string;
  degree: string;
  educationImg: string;
  school: string;
  startDate: string;
  endDate: string | 'Current';
  userId: string;
}

export interface IExperience {
  id: string;
  title: string;
  certificate: string;
  description: string;
  experienceImg: string;
  startDate: string;
  endDate: string;
  userId: string;
}

export interface IProject {
  id: string;
  deployUrl: string;
  description: string;
  projectImg: string;
  title: string;
  urls: IProjectUrl[];
  techs: ITechnology[];
  userId: string;
}

export enum SkillType {
  LANGUAGE,
  HARD_AND_SOFT,
}

export interface ISkill {
  id: string;
  abilityPercentage: string;
  name: string;
  type: SkillType;
}

export interface ITechnology {
  id: string;
  name: string;
  techImg: string;
}

export interface IUser {
  id: string;
  aboutMe: string;
  firstName: string;
  githubUrl: string;
  lastName: string;
  linkedInUrl: string;
  password: string;
  profileImg: string;
  username: string;
  fullName: string;
}

export interface IProjectUrl {
  id: string;
  url: string;
  name: string;
  project: IProject;
  projectid: string;
}
