export interface IEducation {
  id: string;
  User: IUser;
  userId: string;
  createdAt: Date;
  degree: string;
  educationImg: string;
  school: string;
  startDate: string;
  endDate: string | 'current';
}

export interface IExperience {
  id: string;
  title: string;
  certificate: string;
  description: string;
  endDate: string;
  startDate: string;
  experienceImg: string;
}
export interface IProject {
  id: string;
  title: string;
  deployUrl: string;
  description: string;
  projectImg: string;
  urls: IProjectUrl[];
  techs: ITechnology[];
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
  projects: IProject[];
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
  createdAt: Date;
}

export interface IProjectUrl {
  id: string;
  url: string;
  name: string;
  project: IProject;
  projectid: string;
}
