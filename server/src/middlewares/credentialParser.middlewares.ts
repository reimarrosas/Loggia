import { RequestHandler } from 'express';

import { verifyJwt } from '../controllers/auth.controllers';
import { HttpUnauthorized } from '../utils/HttpErrors/HttpUnauthorized';
import { isNullish } from '../utils/isNullish';

export const parseCreds: RequestHandler = (req, _res, next) => {
  const { loggia_sess } = req.signedCookies;

  if (isNullish(loggia_sess)) {
    throw new HttpUnauthorized();
  }

  const { user_id, user_name, user_email } = verifyJwt(loggia_sess);
  if (user_id && user_name && user_email) {
    req.credentials = {
      userId: parseInt(`${user_id}`),
      userName: user_name,
      userEmail: user_email,
    };

    return next();
  } else {
    throw new HttpUnauthorized();
  }
};
