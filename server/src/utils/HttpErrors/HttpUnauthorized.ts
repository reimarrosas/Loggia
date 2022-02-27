import { HttpError } from "./HttpError";

export class HttpUnauthorized extends HttpError {
  constructor() {
    super('Unauthorized', 'Client is unauthenticated', 401);
  }
}