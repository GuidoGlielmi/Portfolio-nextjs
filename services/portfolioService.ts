import {IEducation, IExperience, IProject, ISkill, ITechnology, IUser} from 'IPortfolio';
import {IPortfolio} from './ApiConfig';
import Requests, {HttpReq} from './Fetch';
import RequestError from './RequestError';

class PortfolioService {
  #fetch: Requests;

  constructor(request: Requests) {
    this.#fetch = request;
  }

  async #responseHandler({url, method, body}: HttpReq) {
    const res = (await this.#fetch.makeRequest({url, body, method})) as IPortfolio;
    if (res.status_code < 200 || res.status_code >= 300) {
      throw new RequestError({
        status: res.status_code,
        message: res.message,
      });
    }
    return res.result;
  }

  async getEducations(): Promise<IEducation[]> {
    return this.#responseHandler({url: 'educations'});
  }
  async getExperiences(): Promise<IExperience[]> {
    return this.#responseHandler({url: 'experiences'});
  }
  async getProjects(): Promise<IProject[]> {
    return this.#responseHandler({url: 'projects'});
  }
  async getSkills(): Promise<ISkill[]> {
    return this.#responseHandler({url: 'skills'});
  }
  async getTechs(): Promise<ITechnology[]> {
    return this.#responseHandler({url: 'technologies'});
  }
  async getUsers(): Promise<IUser[]> {
    return this.#responseHandler({url: 'users'});
  }
}

const request = new Requests('https://portfolio-back.azurewebsites.net/api/');

export default new PortfolioService(request);
