import { HttpError } from "./HttpError";

export class HttpConflict extends HttpError {
  constructor(message: string) {
    super('Conflict', message, 409);
  }
}