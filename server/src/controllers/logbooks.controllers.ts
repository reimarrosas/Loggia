import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { getAllLogbooks } from '../database/services/logbooks.services';

export const getLogbooks: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;

    res.send({
      logbooks: await getAllLogbooks(userId),
    });
  }
);
