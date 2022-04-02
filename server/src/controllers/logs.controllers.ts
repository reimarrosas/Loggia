import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { createNewLog, getAllLogs } from '../database/services/logs.services';
import { getAllEntries } from '../database/services/entries.services';
import { HttpBadRequest } from '../utils/HttpErrors/HttpBadRequest';
import { HttpUnauthorized } from '../utils/HttpErrors/HttpUnauthorized';
import { isLogbookAccessible } from '../database/services/logbooks.services';

const validateEntityId = (entityId: unknown) =>
  typeof entityId === 'string' && parseInt(entityId);

const areEntriesValid = (entries: unknown) =>
  Array.isArray(entries) &&
  entries.every(
    e =>
      isEntryTimeValid(e.entry_time) &&
      isEntryTextValid(e.entry_text) &&
      isEntryTypeValid(e.entry_type)
  );

const isEntryTimeValid = (entryTime: unknown) =>
  typeof entryTime === 'string' &&
  // Checks if entryTime follows the 24-hour time format
  /(([0-1](?=[0-9]))|(2(?=[0-3])))[0-9]:[0-5][0-9]/.test(entryTime);

const isEntryTextValid = (entryText: unknown) =>
  typeof entryText === 'string' && entryText.trim().length !== 0;

const isEntryTypeValid = (entryType: unknown) =>
  typeof entryType === 'string' &&
  (entryType === 'event' || entryType === 'decision');

export const getLogs: RequestHandler = asyncHandler(async (req, res, _next) => {
  const { userId } = req.credentials;

  const logbookId = validateEntityId(req.query['logbookId']);
  if (!logbookId) {
    throw new HttpBadRequest('Logbook ID must be numeric!');
  }

  res.send({
    logs: await getAllLogs(logbookId, userId),
  });
});

export const getLogEntries: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { userId } = req.credentials;

    const logId = validateEntityId(req.params['logId']);
    const logbookId = validateEntityId(req.query['logbookId']);
    if (!logId || !logbookId) {
      throw new HttpBadRequest('Log ID and Logbook ID must be numeric!');
    }

    res.send({
      logId: logId,
      entries: await getAllEntries(logId, logbookId, userId),
    });
  }
);

export const createLog = asyncHandler(async (req, res, _next) => {
  const { userId } = req.credentials;
  const { logDate, logTitle, entries } = req.body;

  const logbookId = validateEntityId(req.query['logbookId']);
  if (!logbookId) {
    throw new HttpBadRequest('Logbook ID must be numeric!');
  }

  if (!(await isLogbookAccessible(logbookId, userId))) {
    throw new HttpUnauthorized();
  }

  if (
    typeof logDate !== 'string' &&
    typeof logTitle !== 'string' &&
    !areEntriesValid(entries)
  ) {
    throw new HttpBadRequest(
      'Log Title and Log Date must be a string, and Entries must be an array of entries.'
    );
  }

  await createNewLog(logbookId, logDate, logTitle, entries);

  res.send({
    message: 'Log creation successful!',
  });
});
