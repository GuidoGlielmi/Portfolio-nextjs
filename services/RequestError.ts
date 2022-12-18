export interface IRequestError {
  status?: number;
  message: string;
}

export default class RequestError {
  status?: number;
  message: string;

  constructor({status, message}: IRequestError) {
    this.status = status;
    this.message = message;
  }
}
