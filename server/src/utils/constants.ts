import { CookieOptions } from "express";

export const cookieSetting: CookieOptions = {
  maxAge: 60 * 60 * 24 * 365 * 3,
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env['NODE_ENV'] === 'production',
  signed: true,
};
