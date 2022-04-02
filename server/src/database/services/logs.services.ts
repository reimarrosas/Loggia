import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';
import { createEntries, Entry } from './entries.services';

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

export const createNewLog = async (
  logbookId: number,
  logTitle: string,
  logDate: string,
  entries: Array<Partial<Entry>>
) => {
  try {
    await db.tx(async t => {
      const logId = await t.one<number>(
        `
          INSERT INTO logs (log_title, log_date, logbook_id)
          VALUES ($1, $2, $3)
          RETURNING log_id
        `,
        [logTitle, logDate, logbookId]
      );
      await createEntries(entries, logId, t);
    });
  } catch (err) {
    throw new HttpInternal();
  }
};
