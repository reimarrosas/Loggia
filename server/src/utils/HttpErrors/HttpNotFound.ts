import { HttpError } from './HttpError';

export class HttpNotFound extends HttpError {
  constructor(url: string) {
    super('Not Found', `${url} Not Found!`, 404);
  }
}
