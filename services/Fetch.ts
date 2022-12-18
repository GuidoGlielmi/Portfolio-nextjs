import RequestError from './RequestError';

export interface HttpReq {
  url?: string;
  body?: any;
  method?: string;
}

export default class Requests {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async makeRequest({url = '', body, method = 'GET'}: HttpReq): Promise<any> {
    let rawRes: Response;
    const completeUrl = `${this.#baseUrl}${url}`;
    console.log(completeUrl);
    try {
      rawRes = await fetch(completeUrl, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        ...(body && {body: JSON.stringify(body)}),
      });
    } catch (e) {
      console.log(e, 'No internet');
      throw new RequestError({message: 'No internet connection'});
    }
    try {
      return await rawRes.json();
    } catch {
      // response nody should never be empty
      throw new RequestError({message: 'Empty response body'});
    }
  }
}
