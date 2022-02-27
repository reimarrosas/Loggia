import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  findUserByEmail,
  UserCredentials,
} from '../database/services/auth.services';
import { HttpBadRequest } from '../utils/HttpErrors/HttpBadRequest';
import { HttpNotFound } from '../utils/HttpErrors/HttpNotFound';
import { isNullish } from '../utils/isNullish';
import { HttpUnauthorized } from '../utils/HttpErrors/HttpUnauthorized';
import { cookieSetting } from '../utils/constants';

const generateJwt = (payload: Partial<UserCredentials>): string =>
  jwt.sign(payload, process.env['TOKEN_SECRET'] ?? 'Tungsten Rat');

export const login: RequestHandler = asyncHandler(async (req, res, _next) => {
  const { email, password, keepLoggedIn } = req.body;

  if (isNullish(email, password, keepLoggedIn)) {
    throw new HttpBadRequest('Email or Password Missing!');
  }

  const user = await findUserByEmail(email);
  if (user === null) {
    throw new HttpNotFound('User');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpUnauthorized();
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  res.cookie('loggia-sess', generateJwt(payload), cookieSetting);
  res.send({
    id: payload.id,
    name: payload.name,
    email: payload.email,
  });
});
