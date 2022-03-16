import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { getAllLogs } from '../database/services/logs.services';
import { HttpBadRequest } from '../utils/HttpErrors/HttpBadRequest';

export const getLogs: RequestHandler = asyncHandler(async (req, res, _next) => {
  const { userId } = req.credentials;
  const { logbookId } = req.query;

  const _logbookId = typeof logbookId === 'string' && parseInt(logbookId);
  if (!_logbookId) {
    throw new HttpBadRequest('Logbook ID must be numeric!');
  }

  res.send({
    logs: await getAllLogs(_logbookId, userId),
  });
});