import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { createTransport } from 'nodemailer';

import {
  createUser,
  findUserByEmail,
  UserCredentials,
  verifyUser,
} from '../database/services/auth.services';
import { HttpBadRequest } from '../utils/HttpErrors/HttpBadRequest';
import { HttpNotFound } from '../utils/HttpErrors/HttpNotFound';
import { isNullish } from '../utils/isNullish';
import { HttpUnauthorized } from '../utils/HttpErrors/HttpUnauthorized';
import { cookieSetting } from '../utils/constants';
import { HttpConflict } from '../utils/HttpErrors/HttpConflict';
import { HttpInternal } from '../utils/HttpErrors/HttpInternal';

const generateJwt = (payload: Partial<UserCredentials>): string =>
  jwt.sign(payload, process.env['TOKEN_SECRET'] ?? 'Tungsten Rat');

export const verifyJwt = (token: string): Partial<UserCredentials> => {
  try {
    return <UserCredentials>(
      jwt.verify(token, process.env['TOKEN_SECRET'] ?? 'Tungsten Rat')
    );
  } catch (err) {
    throw new HttpBadRequest('Token Invalid!');
  }
};

const sendVerificationEmail = async (email: string) => {
  try {
    console.log(process.env['TRANSPORT_EMAIL']);
    const transporter = createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env['TRANSPORT_EMAIL'],
        pass: process.env['TRANSPORT_PASS'],
      },
      logger: true,
      debug: true,
    });
    console.log('Before Sending!');
    await transporter.sendMail({
      from: `Loggia Web App <${process.env['TRANSPORT_EMAIL']}>`,
      to: email,
      subject: 'Verify your email!',
      html: `Verify your account using this <a href='${
        process.env['URL_ROOT']
      }/api/auth/verify/${generateJwt({ user_email: email })}'>link</a>!`,
    });
    console.log('After Sending!');
  } catch (err) {
    throw new HttpInternal();
  }
};

export const login: RequestHandler = asyncHandler(async (req, res, _next) => {
  const { email, password, keepLoggedIn } = req.body;

  if (isNullish(email, password, keepLoggedIn)) {
    throw new HttpBadRequest('Email or Password Missing!');
  }

  const user = await findUserByEmail(email);
  if (user === null) {
    throw new HttpNotFound('User');
  }

  if (!user.is_verified) {
    throw new HttpUnauthorized();
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
  res.cookie('loggia_sess', generateJwt(payload), cookieSetting(keepLoggedIn));
  res.send({
    id: payload.user_id,
    name: payload.user_name,
    email: payload.user_email,
  });
});

export const register: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { name, email, password } = req.body;

    if (isNullish(name, email, password)) {
      throw new HttpBadRequest('Name, Email, or Password Missing!');
    }

    const user = await findUserByEmail(email);
    if (user !== null) {
      throw new HttpConflict('User already exists!');
    }

    await sendVerificationEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreds: Partial<UserCredentials> = {
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
    };
    await createUser(userCreds);

    res.status(201).send({
      message: 'User registration successful!',
    });
  }
);

export const emailVerify: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { token } = req.params;

    if (isNullish(token)) {
      throw new HttpBadRequest('Token does not exist!');
    }

    const { user_email } = verifyJwt(token ?? 'UNREACHABLE');
    const updatedRows = await verifyUser(user_email ?? 'UNREACHABLE');
    if (updatedRows !== 1) {
      throw new HttpNotFound('User');
    }

    res.send({
      message: 'User successfully verified!',
    });
  }
);

export const loginStatus: RequestHandler = (req, res, _next) => {
  const { loggia_sess } = req.signedCookies;

  if (isNullish(loggia_sess)) {
    throw new HttpUnauthorized();
  }

  const { user_id, user_name, user_email } = verifyJwt(loggia_sess);
  res.send({
    id: user_id,
    name: user_name,
    email: user_email,
  });
};
