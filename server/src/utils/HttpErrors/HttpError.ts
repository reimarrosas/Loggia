export abstract class HttpError extends Error {
  statusCode!: number;

  constructor(name: string, message: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  public override toString(): string {
    return `Error ${this.statusCode}: ${this.name} --- ${this.message}`;
  }
}
