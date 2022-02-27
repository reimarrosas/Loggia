import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import {
  createLogbook,
  getAllLogbooks,
} from '../database/services/logbooks.services';
import { HttpBadRequest } from '../utils/HttpErrors/HttpBadRequest';
import { isNullish } from '../utils/isNullish';

export const getLogbooks: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;

    res.send({
      logbooks: await getAllLogbooks(userId),
    });
  }
);

export const createLogbooks: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;

    const { logbookName } = req.body;

    if (logbookName) {
      throw new HttpBadRequest('Logbook Name Required!');
    }

    await createLogbook(logbookName, userId);

    res.send({
      message: 'Logbook successfully created!',
    });
  }
);
