export {};
import {SkillType, Tech, TechType} from '@constants';

declare global {
  type Ref = {
    ref: React.RefObject<HTMLDivElement>;
    title: string;
    href: string;
  };

  interface Es<obj> {
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

  type EndDate = 'Current' | Date;
  type DateUnit = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
  type Date = `${DateUnit}/${DateUnit}`;

  interface IExperience extends IProject {
    startDate: Date;
    endDate: EndDate;
  }

  interface IProject extends Es<IProjectSpanish> {
    certificate: string | undefined;
    deployUrl: string;
    deployVideo: string;
    image: string;
    title: string;
    description: string;
    urls: IProjectUrl[];
    techs: Tech[];
  }

  interface ISkill extends Es<ISkillSpanish> {
    name: string;
    type: SkillType;
  }

  interface ITechnology {
    name: Tech;
    image: string;
    type: TechType;
  }

  interface IUser extends Es<IUserSpanish> {
    aboutMe: string;
    firstName: string;
    githubUrl: string;
    lastName: string;
    linkedInUrl: string;
    image: string;
    articles: IArticle[];
  }

  interface IArticle {
    title: string;
    url: string;
  }

  interface IProjectUrl {
    url: string;
    name: string;
  }
}
