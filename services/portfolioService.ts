import {IExperience, IProject, ISkill, ITechnology, IUser} from 'IPortfolio';
import {IPortfolio} from './ApiConfig';
import Requests, {HttpReq} from './Fetch';
import RequestError from './RequestError';

class PortfolioService {
  #fetch: Requests;

  constructor(request: Requests) {
    this.#fetch = request;
  }

  async #responseHandler(options: HttpReq) {
    const res = await this.#fetch.makeRequest(options);
    if (res.status_code < 200 || res.status_code >= 300) {
      throw new RequestError({
        status: res.status_code,
        message: res.message,
      });
    }
    return res;
  }

  async getExperiences(es = false): Promise<IExperience[]> {
    return this.#responseHandler({url: `experiences${es ? '?lang=es' : ''}`});
  }
  async getProjects(es = false): Promise<IProject[]> {
    return this.#responseHandler({url: `projects${es ? '?lang=es' : ''}`});
  }
  async getSkills(es = false): Promise<ISkill[]> {
    return this.#responseHandler({url: `skills${es ? '?lang=es' : ''}`});
  }
  async getTechs(es = false): Promise<ITechnology[]> {
    return this.#responseHandler({url: `technologies`});
  }
  async getUsers(es = false): Promise<IUser[]> {
    return this.#responseHandler({url: `users${es ? '?lang=es' : ''}`});
  }
}

let request: Requests;
if (process.env.IS_LOCAL) {
  request = new Requests('http://localhost:7101/api/');
} else {
  request = new Requests('https://portfolio-back.azurewebsites.net/api/');
}

export default new PortfolioService(request);
//
