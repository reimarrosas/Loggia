import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

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

  const isPasswordCorrect = await bcrypt.compare(password, user.user_password);
  if (!isPasswordCorrect) {
    throw new HttpUnauthorized();
  }

  const payload = {
    user_id: user.user_id,
    user_name: user.user_name,
    user_email: user.user_email,
  };
  res.cookie('loggia-sess', generateJwt(payload), cookieSetting(keepLoggedIn));
  res.send({
    id: payload.user_id,
    name: payload.user_name,
    email: payload.user_email,
  });
});
