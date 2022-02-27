import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import {
  createLogbook,
  deleteLogbook,
  getAllLogbooks,
  updateLogbook,
} from '../database/services/logbooks.services';
import { HttpBadRequest } from '../utils/HttpErrors/HttpBadRequest';

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

    if (!logbookName) {
      throw new HttpBadRequest('Logbook Name Required!');
    }

    await createLogbook(logbookName, userId);

    res.send({
      message: 'Logbook successfully created!',
    });
  }
);

export const updateLogbooks: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;

    const { logbookId } = req.params;
    const { logbookName } = req.body;

    if (!logbookId || !logbookName) {
      throw new HttpBadRequest('Logbook ID and Logbook Name Required!');
    }

    const rowCount = await updateLogbook(
      logbookName,
      parseInt(logbookId),
      userId
    );
    if (rowCount !== 1) {
      throw new HttpBadRequest('Logbook ID Invalid!');
    }

    res.status(201).send({
      message: `Logbook ${logbookId} successfully updated!`,
    });
  }
);

export const deleteLogbooks: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;

    const { logbookId } = req.params;
    if (!logbookId) {
      throw new HttpBadRequest('Logbook ID Required!');
    }

    const rowCount = await deleteLogbook(parseInt(logbookId), userId);
    if (rowCount !== 1) {
      throw new HttpBadRequest('Logbook ID Invalid!');
    }

    res.send({
      message: `Logbook ${logbookId} successfully deleted!`,
    });
  }
);
