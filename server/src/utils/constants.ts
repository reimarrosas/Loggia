import { CookieOptions } from "express";

type KeepLoggedIn = 'true' | 'false';

export const cookieSetting = (isKeepLoggedIn: KeepLoggedIn): CookieOptions => {
  const options: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env['NODE_ENV'] === 'production',
    signed: true,
  }

  if (isKeepLoggedIn === 'true') {
    options.maxAge = 60 * 60 * 24 * 365 * 3;
  }

  return options;
}