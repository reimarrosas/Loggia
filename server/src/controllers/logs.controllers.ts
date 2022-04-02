import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { getAllLogs } from '../database/services/logs.services';
import { getAllEntries } from '../database/services/entries.services';
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

export const getLogEntries: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;
    const { logId } = req.params;
    const { logbookId } = req.query;

    const _logId = typeof logId === 'string' && parseInt(logId);
    const _logbookId = typeof logbookId === 'string' && parseInt(logbookId);

    if (!_logId || !_logbookId) {
      throw new HttpBadRequest('Log ID and Logbook ID must be numeric!');
    }

    res.send({
      logId: _logId,
      entries: await getAllEntries(_logId, _logbookId, userId),
    });
  }
);
