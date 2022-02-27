import { HttpError } from './HttpError';

export class HttpInternal extends HttpError {
  constructor() {
    super('Internal Server Error', 'Something Broke!', 500);
  }
}
