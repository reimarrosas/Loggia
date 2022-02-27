import { HttpError } from './HttpError';

export class HttpBadRequest extends HttpError {
  constructor(message: string) {
    super('Bad Request', message, 400);
  }
}
