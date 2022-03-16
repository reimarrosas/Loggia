import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';
import { getAllDecisions } from './decisions.services';
import { getAllEvents } from './events.services';

export const getAllLogs = async (logbookId: number, userId: number) => {
  try {
    return await db.manyOrNone(
      `
        SELECT log_id, log_date, log_title, created_at, updated_at
        FROM
          logs JOIN logbooks ON
          logs.logbook_id = logbooks.logbook_id
        WHERE logbook_id = $1 AND user_id = $2
    `,
      [logbookId, userId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};

export const getSingleLog = async (
  logId: number,
  logbookId: number,
  userId: number
) => {
  try {
    const log = await db.oneOrNone(
      `
        SELECT log_id, log_date, log_title, created_at, updated_at
        FROM
          logs JOIN logbooks ON
          logs.logbook_id = logbooks.logbook_id
        WHERE log_id = $1 AND logbook_id = $2 AND user_id = $3
    `,
      [logId, logbookId, userId]
    );

    if (!log) {
      return null;
    }

    log.events = await getAllEvents(log.log_id);
    log.decisions = await getAllDecisions(log.log_id);

    return log;
  } catch (err) {
    throw new HttpInternal();
  }
};
