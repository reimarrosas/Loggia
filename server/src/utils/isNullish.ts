export const isNullish = (...rest: unknown[]): boolean =>
  rest.reduce((acc: boolean, cur: unknown) => acc || cur == null, false);
