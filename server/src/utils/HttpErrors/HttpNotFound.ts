import { HttpError } from './HttpError';

export class HttpNotFound extends HttpError {
  constructor(resource: string) {
    super('Not Found', `${resource} Not Found!`, 404);
  }
}
